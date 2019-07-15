import { loaders } from "@ts-extras/types";
import { TS_EXTENSION } from "@ts-extras/constants";

export function createBaseLoader(info: loaders.LoaderExport, dirname: string = process.cwd()): loaders.BaseLoader {
    const { extension, redirect: redirector, parse: loaderParser } = info;
    const handles = getExtensionChecker(extension);
    const wasRedirected = getExtensionChecker(extension, TS_EXTENSION);
    const wasRedirectedFrom = wasRedirectedFromFactory(extension);
    return {
        dirname,
        handles,
        multiFile: false,
        extension,
        redirect,
        wasRedirected,
        wasRedirectedFrom,
        toRedirected,
        parse,
    }

    function parse(fileName: string, to: string, content: string): loaders.MappedFileInfo {
        return extendMapping(loaderParser(fileName, to, content));
    }

    function redirect(fileName: string, addFile: (fileName: string, to: string) => void) {
        if (redirector && redirector(fileName, addFile)) {
            return true;
        }
        addFile(fileName, toRedirected(fileName));
        return true;
    }
}

function extendMapping(value: loaders.MappingFileInfo): loaders.MappedFileInfo {
    return {
        end: value.span.start + value.span.length,
        length: value.span.length,
        newText: value.newText,
        oldText: value.oldText,
        start: value.span.start,
    }
}
function wasRedirectedFromFactory(baseExt: string) {
    return function (newExt: string, fileName: string) {
        return getExtensionChecker(baseExt, newExt)(fileName);
    }
}

function toRedirected(fileName: string) {
    return fileName + TS_EXTENSION;
}

const cache = {} as Record<string, (file: string) => boolean>;
/**
 * Although we have a branch in the code (type can exist or not), we can have a cache, since they are exlusive 
 * with type is reditected file to ts, or an output to a redirected ts file
 * without type, is the extension checker
 */
function getExtensionChecker(extension: string, type: string): (file: string) => string | false
function getExtensionChecker(extension: string): (file: string) => boolean
function getExtensionChecker(extension: string, type?: string) {
    const cacheKey = arguments.length === 1 ? extension : extension + type;
    if (cache[cacheKey]) {
        return cache[cacheKey];
    }

    return cache[cacheKey] = new Function('fileName', `return fileName.length > ${extension.length} &&
        ${getChecker(extension + (type || ''))}${type ? ` &&
        fileName.slice(0, -${type.length})` : ''};`) as any;
}

function getChecker(ext: string) {
    return `${ext.split('').reverse().map((c, i) => `fileName[fileName.length - ${i + 1}] === '${c}'`).join(` &&
        `)}`
}
