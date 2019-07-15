




import { loaders } from '@ts-extras/types';
import { createBaseLoader } from './baseLoader';


const cache = new Map<string, loaders.MappedFileInfo>();
export function createCompilerLoader(info: loaders.LoaderExport): loaders.CompilerLoader {
    const baseLoader = createBaseLoader(info);
    const { emit } = info;

    const emitter = emit ? createEmitter(cache, emit) : defaultEmitter;
    return Object.assign(baseLoader, {
        readContent,
        emit: emitter,
    });

    function readContent(from: string, to: string, content: string) {
        const item = baseLoader.parse(from, to, content);
        cache.set(toCanonical(from), item);
        return item.newText;
    }
}
function toCanonical(fileName: string): string {
    return fileName.toLowerCase().replace(/\\/g, '/');
}

function createEmitter(cache: Map<string, loaders.MappedFileInfo>, emit: NonNullable<loaders.LoaderExport['emit']>) {
    return function (fileName: string, content: Omit<loaders.EmitResult, 'info'>, writeFile: loaders.WriteFileCallback) {
        emit(fileName, Object.assign({ info: cache.get(toCanonical(fileName))! }, content), writeFile);
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
