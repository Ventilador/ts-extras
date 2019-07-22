import { loaders } from "@ts-extras/types";
import { server, TextChange, isJSDocTemplateTag } from "typescript/lib/tsserverlibrary";
export type ServerCache = loaders.Cache & {
    applyChange: (from: string, to: string, textChange: TextChange) => void;
};

export function addCacheSyncronization(project: server.Project, loader: loaders.BaseLoader): ServerCache {
    const cache: Record<string, Record<string, loaders.MappedFileInfo>> = new EmptyObj();
    return { get, applyChange };

    function get(from: string, to: string, content?: string) {
        from = toCanonical(from);
        to = toCanonical(to);
        if (!has(cache, from)) {
            cache[from] = new EmptyObj();
        }

        if (!has(cache[from], to)) {
            cache[from][to] = loader.parse(from, to, content || getFileText(project, from));
        }

        return cache[from][to];
    }

    function applyChange(from: string, to: string, textChange: TextChange) {
        const cacheItem = get(from, to);
        const { span: { start, length }, newText } = textChange;
        const end = start + length;
        if (isInRange(cacheItem, start, end)) {
            applySimpleChange(cacheItem, start, end, newText);
        } else {

        }
    }
}

function applySimpleChange(item: loaders.MappedFileInfo, start: number, end: number, addedText: string) {
    item.end += addedText.length;
    item.length = item.end - item.start;
    item.newText = item.newText.slice(0, start) + addedText + item.newText.slice(end);
}

function isInRange(item: loaders.MappedFileInfo, start: number, end: number) {
    return start >= 0 && item.length <= end;
}

function toCanonical(file: string) {
    return normalizeSlashes(file.toLowerCase());
}

function getFileText(project: server.Project, file: string) {
    const info = project.getScriptInfo(file);
    if (!info) {
        throw new Error(`${file} has not been loaded`);
    }

    const snap = info.getSnapshot();
    const length = snap.getLength();
    return snap.getText(0, length);
}

function has(obj: any, key: string) {
    return Object.prototype.hasOwnProperty.call(obj, key);
}

const EmptyObj: any = function () { };
EmptyObj.prototype = null;

function normalizeSlashes(f: string) {
    return f.replace(/\\/g, '/');
}
