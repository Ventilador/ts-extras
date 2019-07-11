import { loaders, fs } from '@ts-extras/types';
import { D_TS_EXTENSION, JS_EXTENSION, MAP_EXTENSION, TS_EXTENSION, MAP_D_TS_EXTENSION } from '@ts-extras/constants';
import { LineAndCharacter, TextRange, TextChange } from 'typescript';

type InternalMappingFileInfo = loaders.MappingFileInfo & { end: number, size: number };
const cache = new Map<string, InternalMappingFileInfo>();
export function createLoader(
    { redirect: redirector, extension, parse, emit }: loaders.LoaderExport,
    fs: Pick<fs.MemoryFileSystem, 'readFile'>,
): loaders.Loader {
    const handles = createExtensionChecker(extension);
    const wasRedirected = createFileSlicer(extension, TS_EXTENSION);
    const getDefinitionOutputFileName = createFileSlicer(extension, D_TS_EXTENSION);
    const getJsOutputFileName = createFileSlicer(extension, JS_EXTENSION);
    const getSourceMapFileName = createFileSlicer(extension, MAP_EXTENSION);
    const getDTsSourceMapFileName = createFileSlicer(extension, MAP_D_TS_EXTENSION);
    const emitter = emit ? createEmitter(cache, emit) : defaultEmitter;
    return {
        multiFile: false,
        extension,
        redirect,
        handles,
        getDefinitionOutputFileName,
        getJsOutputFileName,
        getSourceMapFileName,
        getDTsSourceMapFileName,
        readContent,
        wasRedirected,
        emit: emitter,
        moveFile,
        movePosition,
        moveLineAndChar,
        toRedirected,
        movePositionWithinFile,
        outOfBounds,
        updateContent,
    };

    function updateContent(file: string, chance: TextChange): void {
        const content = getFromCache(fs, file, readContent);
        content.oldText = applyChange(content.oldText, chance);
        readContent(file, toRedirected(file), content.oldText);
    }


    function outOfBounds(from: string, to: string, pos: number | TextRange): boolean {
        if (typeof pos === 'number') {
            if (handles(from)) {
                const { span: { start }, end } = cache.get(from)!;
                return !isBetween(pos, 0, end - start);
            } else if (handles(to)) {
                const { span: { start }, end } = cache.get(to)!;
                return !isBetween(pos, start, end);
            }
            return false;
        } else {
            return outOfBounds(from, to, pos.end) || outOfBounds(from, to, pos.pos);
        }
    }

    function movePositionWithinFile(from: string, to: string, pos: number): number {
        if (handles(from)) {
            const { span: { start }, end } = getFromCache(fs, from, readContent);
            return between(pos - start, start, end);
        } else if (handles(to)) {
            const { span: { start }, end } = getFromCache(fs, to, readContent);
            return between(start + pos, start, end);
        }

        throw new Error(`Does not handles either file names "${from}" "${to}"`);
    }


    function moveLineAndChar(from: string, to: string, info: LineAndCharacter) {
        debugger;
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
            const item = getFromCache(fs, from, readContent);
            return pos - item.span.start;
        } else if (handles(to)) {
            const item = getFromCache(fs, to, readContent);
            return item.span.start + pos;
        }

        throw new Error(`Does not handles either file names "${from}" "${to}"`);
    }

    function readContent(from: string, to: string, content: string): string {
        const result = parse(redirector ? to : from, content);
        cache.set(from, extendMapping(result));
        return result.newText;
    }

    function redirect(fileName: string, addFile: (fileName: string, to: string) => void) {
        if (redirector && redirector(fileName, addFile)) {
            return true;
        }
        addFile(fileName, toRedirected(fileName));
        return true;
    }
}

function toRedirected(fileName: string) {
    if (fileName.endsWith(TS_EXTENSION)) {
        debugger;
    }
    return fileName + TS_EXTENSION;
}

function getFromCache(fs: Pick<fs.MemoryFileSystem, 'readFile'>, file: string, parser: (from: string, to: string, content: string) => string) {
    let result = cache.get(file);
    if (result) {
        return result;
    }

    const fileContent = fs.readFile(file);
    parser(file, toRedirected(file), fileContent);
    return cache.get(file)!;


}
function applyChange(oldText: string, { newText, span: { start, length } }: TextChange) {
    return `${oldText.slice(0, start)}${newText}${oldText.slice(start + length)}`;
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

function createEmitter(cache: Map<string, loaders.MappingFileInfo>, emit: loaders.LoaderExport['emit']) {
    return function (fileName: string, content: Omit<loaders.EmitResult, 'info'>, writeFile: loaders.WriteFileCallback) {
        emit!(fileName, Object.assign({ info: cache.get(fileName)! }, content), writeFile);
    }
}
function defaultEmitter(fileName: string, content: Omit<loaders.EmitResult, 'info'>, writeFile: loaders.WriteFileCallback) {
    let item = content.getDTs();
    writeFile(fileName + '.d.ts', item);
    item = content.getJs();
    writeFile(fileName + '.js', item);
    item = content.getDTsMap();
    writeFile(fileName + '.d.ts.map', item);
    item = content.getMap();
    writeFile(fileName + '.js.map', item);
}

function createExtensionChecker(extension: string): (file: string) => boolean {
    return new Function('fileName', `return fileName.length > ${extension.length} &&
        ${extension.split('').reverse().map((c, i) => `fileName[fileName.length - ${i + 1}] === '${c}'`).join(`&&
        `)};`) as any;
}
function createFileSlicer(extension: string, type: string): (file: string) => false | string {
    return new Function('fileName', `return fileName.length > ${extension.length + type.length} &&
        ${(extension + type).split('').reverse().map((c, i) => `fileName[fileName.length - ${i + 1}] === '${c}'`).join(`&&
        `)} &&
        fileName.slice(0, -${type.length});`) as any;
}

