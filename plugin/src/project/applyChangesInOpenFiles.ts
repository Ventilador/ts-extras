import { server, ScriptKind, TextChange, SyntaxKind } from "typescript/lib/tsserverlibrary";
import { Mappers } from "../mappers";
import { createFs } from "@ts-extras/mem-fs";
export type ApplyChangesInOpenFiles = (
    this: server.ProjectService,
    openFiles: Iterator<OpenFileArguments> | undefined,
    changedFiles?: Iterator<ChangeFileArguments>,
    closedFiles?: string[]
) => any;

export function applyChangesInOpenFilesFactory(
    orig: ApplyChangesInOpenFiles,
    { handles, redirect, readContent, mapTextChange, updateContent, wasRedirected, toRedirected, }: Mappers,
): ApplyChangesInOpenFiles {
    const fs = createFs(process.cwd(), true);
    let existingOpenedFiles: ts.Map<server.NormalizedPath | undefined> = null as any;
    return function applyChangesInOpenFiles(
        this: server.ProjectService,
        openFiles: Iterator<OpenFileArguments> | undefined,
        changedFiles?: Iterator<ChangeFileArguments>,
        closedFiles?: string[]
    ) {
        existingOpenedFiles = this.openFiles;
        if (openFiles) {
            openFiles = patchOpenedFiles(openFiles);
        }

        if (changedFiles) {
            changedFiles = patchChangedFiles(changedFiles);
        }

        if (closedFiles) {
            closedFiles = patchClosedFiles(closedFiles);
        }

        try {
            return orig.call(this, openFiles, changedFiles, closedFiles);
        } catch (err) {
            debugger;
            throw err;
        }
    }

    function patchOpenedFiles(opening: Iterator<OpenFileArguments>) {
        return iteratorToArray(opening).reduce((prev, openedFile) => {
            if (handles(openedFile.fileName)) {
                redirect(openedFile.fileName, (from, to) => openFile(prev, from, to, openedFile))
            }
            if (!hasItem(openedFile.fileName)) {
                prev.set(openedFile.fileName, openedFile);
            }
            return prev;
        }, new Map<string, OpenFileArguments>()).values();
    }

    function openFile(prev: Map<string, OpenFileArguments>, from: string, to: string, openedFile: OpenFileArguments) {
        if (handles(to) || hasItem(to)) {
            return;
        }
        const newContent = readContent(from, to, openedFile.content!);
        fs.writeVirtualFile(from, to, () => newContent);
        prev.set(to, {
            content: newContent,
            fileName: to,
            hasMixedContent: false,
            scriptKind: ScriptKind.TS,
            projectRootPath: openedFile.projectRootPath + '/ax-workbench/gui'
        });
    }

    function patchChangedFiles(changing: Iterator<ChangeFileArguments>) {
        return iteratorToArray(changing).reduce((prev, changedFile) => {
            if (handles(changedFile.fileName)) {
                redirect(changedFile.fileName, (from, to) => {
                    return addChange(prev, to, mapIterator(changedFile.changes, change => {
                        // change = mapTextChange(from, to, change);
                        updateContent(from, change);
                        change = mapTextChange(from, to, change);
                        return change;
                    }));
                });
            }
            if (hasItem(changedFile.fileName)) {
                prev.set(changedFile.fileName, changedFile);
            }
            return prev;
        }, new Map<string, ChangeFileArguments>()).values();
    }

    function addChange(prev: Map<string, ChangeFileArguments>, fileName: string, changes: Iterator<TextChange>) {
        prev.set(fileName, {
            fileName: fileName,
            changes: changes
        });
    }

    function patchClosedFiles(closing: string[]): string[] {
        return Array.from(closing.reduce((prev, cur) => {
            if (handles(cur)) {
                redirect(cur, (_from, to) => prev.add(to));
            }
            prev.add(cur);
            return prev;
        }, new Set<string>()).values()).filter(hasItem);
    }

    function hasItem(item: string) {
        return existingOpenedFiles.has(item.toLowerCase());
    }

}
const cache = Object.create(null) as Record<string, string>;

function iteratorToArray<T>(iterator: Iterator<T>): T[] {
    const result: T[] = [];
    while (true) {
        const { done, value } = iterator.next();
        if (done) {
            return result;
        }

        result.push(value);
    }
}

function mapIterator<T, U>(iter: Iterator<T>, mapFn: (x: T) => U): Iterator<U> {
    return {
        next() {
            const iterRes = iter.next();
            return iterRes.done ? iterRes as any : { value: mapFn(iterRes.value), done: false };
        }
    };
}

export interface OpenFileArguments {
    fileName: string;
    content?: string;
    scriptKind?: server.protocol.ScriptKindName | ScriptKind;
    hasMixedContent?: boolean;
    projectRootPath?: string;
}

interface ChangeFileArguments {
    fileName: string;
    changes: Iterator<TextChange>;
}
