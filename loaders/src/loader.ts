import { loaders } from '@ts-extras/types';
import { D_TS_EXTENSION, JS_EXTENSION, MAP_EXTENSION, TS_EXTENSION, MAP_D_TS_EXTENSION } from '@ts-extras/constants';
export function createLoader({ redirect: redirector, extension, parse, emit }: loaders.LoaderExport): loaders.Loader {
    const handles = createExtensionChecker(extension);
    const wasRedirected = createFileSlicer(extension, TS_EXTENSION);
    const getDefinitionOutputFileName = createFileSlicer(extension, D_TS_EXTENSION);
    const getJsOutputFileName = createFileSlicer(extension, JS_EXTENSION);
    const getSourceMapFileName = createFileSlicer(extension, MAP_EXTENSION);
    const getDTsSourceMapFileName = createFileSlicer(extension, MAP_D_TS_EXTENSION);
    const cache = new Map<string, loaders.MappingFileInfo>();
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
    };

    function readContent(from: string, to: string, content: string): string {
        const result = parse(redirector ? to : from, content);
        cache.set(from, result);
        return result.newText;
    }
    function redirect(fileName: string, addFile: (fileName: string, to: string) => void) {
        if (redirector && redirector(fileName, addFile)) {
            return true;
        }
        addFile(fileName, fileName + TS_EXTENSION);
        return true;
    }
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

