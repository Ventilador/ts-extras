import { loaders, fs } from "@ts-extras/types";
import { normalizeSlashes } from 'typescript';

export function mapRootFiles<T extends readonly string[] | undefined>(fileNames: T, loaders: loaders.Loader[], writeVirtualFile: fs.MemoryFileSystem['writeVirtualFile']): T {
    return fileNames && mapper(fileNames!, loaders, writeVirtualFile) as any;
}

function mapper(fileNames: readonly string[], loaders: loaders.Loader[], writeVirtualFile: fs.MemoryFileSystem['writeVirtualFile']): string[] {
    if (loaders.length) {
        return mapWithLoaders(fileNames, loaders, writeVirtualFile);
    }

    return fileNames as any;
}

function mapWithLoaders(fileNames: readonly string[], loaders: loaders.Loader[], writeVirtualFile: fs.MemoryFileSystem['writeVirtualFile']) {
    const result: string[] = [];
    fileNames.map(normalizeSlashes).forEach(reduceLoaders);
    return result;
    function reduceLoaders(file: string) {
        for (const loader of loaders) {
            if (!loader.handles(file) || !loader.redirect(file, createRedirector(loader, result, writeVirtualFile))) {
                result.push(file);
            }
        }
    }
}
function createRedirector(loader: loaders.Loader, prev: string[], writeVirtualFile: fs.MemoryFileSystem['writeVirtualFile']) {
    return function (from: string, to: string) {
        prev.push(to);
        writeVirtualFile(from, to, function (content) {
            return loader.readContent(from, to, content);
        });
    }
}