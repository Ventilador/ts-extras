import { FileWatcherCallback, FileWatcherEventKind, server, DirectoryWatcherCallback } from "typescript/lib/tsserverlibrary";
import { fs } from "@ts-extras/types";
import { createFs } from '@ts-extras/mem-fs';
import { Mappers } from "./mappers";

export function patchFsLikeMethods(original: server.ServerHost, projectDir: string, loader: Mappers) {
    const {
        realpath,
        readDirectory,
        readFile,
        fileExists,
        writeFile,
        stat,
        watchFile: watchFileFs,
        watchDirectory: watchDirectoryFs,
        writeVirtualFile
    } = createFs(projectDir, false);
    original.realpath = realpath;
    original.readDirectory = readDirectory;
    original.getModifiedTime = getModifiedTime;
    original.getFileSize = getFileSize;
    original.readFile = readFile;
    original.fileExists = fileExists;
    original.writeFile = writeFile;
    original.watchFile = watchFile;
    original.watchDirectory = watchDirectory;
    return original;

    // function readdir(path: string, extensions?: readonly string[], exclude?: readonly string[], include?: readonly string[], depth?: number) {
    //     return Array.from(readDirectory(path, extensions && extensions.concat([loader.extension]), exclude, include, depth).reduce(reduceReadDir, new Set<string>()));
    // }

    function reduceReadDir(prev: Set<string>, cur: string) {
        if (loader.handles(cur)) {
            loader.redirect(cur, function (from, to) {
                writeVirtualFile(from, to, function (content) {
                    return loader.readContent(from, to, content);
                });
                prev.add(to);
            })
        }
        prev.add(cur);
        return prev;
    }

    function getModifiedTime(file: string) {
        return stat(file).mtime;
    }

    function getFileSize(file: string) {
        return stat(file).size;
    }
    function watchFile(file: string, cb: FileWatcherCallback) {
        return {
            close: watchFileFs(file, function () {
                cb(file, FileWatcherEventKind.Changed)
            })
        };
    }

    function watchDirectory(file: string, cb: DirectoryWatcherCallback) {
        return {
            close: watchDirectoryFs(file, function () {
                cb(file);
            })
        };
    }
}


