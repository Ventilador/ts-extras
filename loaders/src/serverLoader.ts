import { loaders } from '@ts-extras/types';
import { LineAndCharacter, TextRange } from 'typescript';
import { createBaseLoader } from './baseLoader';

type InternalMappingFileInfo = loaders.MappingFileInfo & { end: number, size: number };
const cache = new Map<string, loaders.MappedFileInfo>();
export function createServerLoader(info: loaders.LoaderExport, baseLoader?: loaders.BaseLoader): loaders.ServerLoader {
    const { redirect, wasRedirected, multiFile, handles, wasRedirectedFrom, extension, toRedirected, dirname, parse: loaderParser } = baseLoader || createBaseLoader(info);

    return {
        dirname,
        extension,
        handles,
        multiFile,
        redirect,
        wasRedirected,
        wasRedirectedFrom,
        moveFile,
        movePosition,
        moveLineAndChar,
        movePositionWithinFile,
        outOfBounds,
        toRedirected,
        parse,
    };

    function parse(fileName: string, to: string, content: string) {
        return loaderParser(fileName, to, content);
    }

    function openFile(from: string, to: string, content: string): string {
        return content;
    }

    function outOfBounds(from: string, to: string, pos: number | TextRange): boolean {
        if (typeof pos === 'number') {
            if (handles(from)) {
                const { length } = cache.get(from)!;
                return !isBetween(pos, 0, length);
            } else if (handles(to)) {
                const { start, end } = cache.get(to)!;
                return !isBetween(pos, start, end);
            }
            return false;
        } else {
            return outOfBounds(from, to, pos.end) || outOfBounds(from, to, pos.pos);
        }
    }

    function movePositionWithinFile(from: string, to: string, pos: number): number {
        if (handles(from)) {
            const { start, end } = cache.get(from)!;
            return between(pos - start, start, end);
        } else if (handles(to)) {
            const { start, end } = cache.get(to)!;
            return between(start + pos, start, end);
        }

        throw new Error(`Does not handles either file names "${from}" "${to}"`);
    }


    function moveLineAndChar(from: string, to: string, info: LineAndCharacter) {
        return info;
    }

    function moveFile(from: string, to: string, fileName: string): string {
        if (handles(from)) {
            return toRedirected(fileName);
        } else if (handles(to)) {
            return wasRedirected(fileName) || fileName;
        }

        throw new Error(`Does not handles either file names "${from}" "${to}"`);
    }

    function movePosition(from: string, to: string, pos: number): number {
        if (handles(from)) {
            const item = cache.get(from)!;
            return pos - item.start;
        } else if (handles(to)) {
            const item = cache.get(to)!;
            return item.start + pos;
        }

        throw new Error(`Does not handles either file names "${from}" "${to}"`);
    }

    // function readContent(from: string, to: string, content: string): string {
    //     const result = parse(redirector ? to : from, content);
    //     cache.set(from, extendMapping(result));
    //     return result.newText;
    // }

    // function redirect(fileName: string, addFile: (fileName: string, to: string) => void) {
    //     if (redirector && redirector(fileName, addFile)) {
    //         return true;
    //     }
    //     addFile(fileName, toRedirected(fileName));
    //     return true;
    // }
}

function defaultCache() {
    return {
        version: function (fileName: string) {
            return 1;
        },
        text: function (fileName: string) {
            return '';
        }
    }
}

function extendMapping(value: loaders.MappingFileInfo): InternalMappingFileInfo {
    return Object.assign(value, {
        end: value.span.start + value.span.length,
        size: value.oldText.length
    })
}
function isBetween(value: number, min: number, max: number) {
    return !(value < min || value > max);
}
function between(value: number, min: number, max: number): number {
    if (value < min) {
        return min;
    }

    if (value > max) {
        return max;
    }

    return value;
}
