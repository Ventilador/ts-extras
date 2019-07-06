import { lstatSync, writeFile as write, realpathSync, mkdirSync, FSWatcher, watch as fsWatch } from "fs";
import { FileSystemEntries, matchFiles } from "typescript";
import { Node, createPointer, Walker } from '@ts-extras/tree-node';
import { FsItem } from "./contents/fsItem";
import { File } from "./contents/file";
import { Stat } from "./contents/stat";
import { Folder } from "./contents/folder";
import { join } from "path";
import { UnsavedFile } from "./contents/unsavedFile";
import { NonExisting } from "./contents/nonExisting";
import { fs } from "@ts-extras/types";
import { VirtualFile, isVirtualFile } from "./contents/virtualFile";
export * from './contents/stat';
function noop(...args: any[]): any;
function noop() { }

export function createFs(rootDir: string, watchFileSystem: boolean): fs.MemoryFileSystem {
    const walk = createPointer<FsItem<any>, fs.Events>(rootDir);
    // const { dispose } = getWatchFileSystem(walk, rootDir, watchFileSystem, doChange);
    const fs: fs.MemoryFileSystem = {
        writeVirtualFile,
        dispose,
        watchDirectory,
        watchFile,
        readFile,
        writeFile,
        directoryExists,
        fileExists,
        readdir,
        stat,
        deleteFile: deleteFile,
        realpath: realpath,
        readDirectory: readDirectory,
        promises: {
            directoryExists: toPromise(directoryExists),
            fileExists: toPromise(fileExists),
            readdir: toPromise(readdir),
            readFile: toPromise(readFile),
            stat: toPromise(stat),
            writeFile: toPromise(writeFile),
            deleteFile: toPromise(deleteFile),
        },
    };

    return fs;
    function dispose() {

    }
    function watchFile(filePath: string, cb: fs.WatchCallback) {
        if (watchFileSystem) {
            return watchInternal(walk, filePath, cb);
        }

        return noop;
    }

    function watchDirectory(filePath: string, cb: fs.WatchCallback) {
        if (watchFileSystem) {
            return watchInternal(walk, filePath, cb);
        }

        return noop;
    }

    function readDirectory(rootDir: string, extensions?: readonly string[] | undefined, exclude?: readonly string[] | undefined, include?: readonly string[] | undefined, depth?: number | undefined): string[] {
        return readDirectoryInternal(fs, rootDir, extensions, exclude, include, depth);
    }

    function realpath(path: string) {
        return realpathInteral(walk, path);
    }

    function deleteFile(path: string) {
        return deleteFileInternal(walk, path);
    }

    function stat(path: string): Stat {
        return ensureNodeContent(walk(path)).stats();
    }

    function readdir(path: string) {
        return readdirInternal(walk, path);
    }

    function fileExists(path: string): boolean {
        return fileExistsInternal(walk, path);
    }

    function directoryExists(path: string): boolean {
        return directoryExistsInternal(walk, path);
    }

    function writeFile(path: string, content: string) {
        return writeFileInternal(walk, path, content);
    }

    function writeVirtualFile(fromPath: string, toPath: string, parser: ((content: string) => string)) {
        return writeVirtualFileInternal(walk, fromPath, toPath, parser);
    }

    function readFile(path: string): string {
        return readFileInternal(walk, path);
    }
}

function realpathInteral(walk: Walker<FsItem<any>, fs.Events>, path: string) {
    return walk(path).fullPath;
}

const beingWatch = Symbol('beingWatched');
function shouldAddWatcher(node: Node<any, any>) {
    return !(node as any)[beingWatch];
}
function watch(node: Node<any, any>, watcher: FSWatcher) {
    (node as any)[beingWatch] = watcher;
    const dispose = node.dispose;
    node.dispose = function () {
        watcher.close();
        return dispose.call(this);
    }
}

function watchInternal(walk: Walker<FsItem<any>, fs.Events>, path: string, cb: fs.WatchCallback) {
    let node = walk(path);
    const content = node.getContent();
    if (content) {
        if (isVirtualFile(content)) {
            node = content.original;
        }
    }
    if (shouldAddWatcher(node)) {
        watch(node, addWatcher(node));
    }
    return node.watch(watcher);
    function watcher(event: string) {
        const content = node.getContent();
        if (content) {
            cb(event, content.stats())
        }
    }
}
let debouncer: NodeJS.Timer | null = null;
let queue: [Node<any, any>, FsEvent][] = [];
function addWatcher(node: Node<any, any>) {
    return fsWatch(node.fullPath, function (event: any) {
        queue.push([node, event]);
        if (debouncer) {
            clearTimeout(debouncer);
        }

        debouncer = setTimeout(flushQueue, 1000);
    });
}
type ReducerMapT = [Node<any, any>, FsEvent];
type DefaultNode = Node<any, any>
type ReducerMap = Map<DefaultNode, ReducerMapT>

// trick to create a function that when called (with an array) that array is the arguments of the apply of the function
const emitter = Function.prototype.apply.bind(emitNode, null) as (evn: ReducerMapT) => any;

function flushQueue() {
    debouncer = null;
    const myQueue = queue.slice();
    queue = [];
    myQueue.reduce(intoMap, new Map<DefaultNode, ReducerMapT>()).forEach(emitter);
}

function intoMap(prev: ReducerMap, cur: ReducerMapT) {
    prev.set(cur[0], cur);
    return prev;
}

function emitNode(node: Node<FsItem<any>, any>, event: FsEvent) {
    const content = node.getContent();
    if (content) {
        content.setStats(null);
    } else {
        node.emit(event);
    }
}

export type FsEvent = 'rename' | 'change'
export type Change = {
    event: FsEvent;
    path: string;
    stats: Stat;
}
function toPromise<T extends (...args: any[]) => any>(val: T): (...args: Parameters<T>) => Promise<ReturnType<T>> {
    return function (this: any) {
        try {
            return Promise.resolve(val.apply(this, arguments as any));
        }
        catch (err) {
            return Promise.reject(err);
        }
    } as any;
}


function readDirectoryInternal(fs: fs.MemoryFileSystem, rootDir: string, extensions?: readonly string[] | undefined, exclude?: readonly string[] | undefined, include?: readonly string[] | undefined, depth?: number | undefined): string[] {
    return matchFiles(rootDir, extensions, exclude, include, true, process.cwd(), depth, getAccessibleFileSystemEntries, fs.realpath!);

    function getAccessibleFileSystemEntries(path: string): FileSystemEntries {
        try {
            const entries = fs.readdir(path).sort();
            const files: string[] = [];
            const directories: string[] = [];
            for (const entry of entries) {
                // This is necessary because on some file system node fails to exclude
                // "." and "..". See https://github.com/nodejs/node/issues/4002
                if (entry === "." || entry === "..") {
                    continue;
                }
                const name = join(path, entry);
                let stat: Stat;
                try {
                    stat = fs.stat(name);
                } catch (e) {
                    continue;
                }
                if (stat.isFile) {
                    files.push(entry);
                }
                else if (stat.isDirectory) {
                    directories.push(entry);
                }
            }
            return { files, directories };
        }
        catch (e) {
            return {
                files: [],
                directories: []
            };
        }
    }
}

function deleteFileInternal(walk: Walker<FsItem<any>, fs.Events>, path: string) {
    walk(path).dispose();
}

function readdirInternal(walk: Walker<FsItem<any>, fs.Events>, path: string) {
    const node = walk(path);
    let content = ensureNodeContent(node);
    if (content.isFolder()) {
        return content.read();
    }

    throw new Error(`Not a folder "${path}"`);
}

function fileExistsInternal(walk: Walker<FsItem<any>, fs.Events>, path: string): boolean {
    try {
        return ensureNodeContent(walk(path)).isFile();
    } catch{
        return false;
    }

}

function directoryExistsInternal(walk: Walker<FsItem<any>, fs.Events>, path: string): boolean {
    try {
        return ensureNodeContent(walk(path)).isFolder();
    } catch (err) {
        noop(err);
        return false;
    }
}

function writeVirtualFileInternal(walk: Walker<FsItem<any>, fs.Events>, fromPath: string, toPath: string, parser: (content: string) => string) {
    const toNode = walk(toPath);
    if (toNode.getContent()) {
        return;
    }

    toNode.setContent(new VirtualFile(walk(fromPath), toNode, parser));
}

function writeFileInternal(walk: Walker<FsItem<any>, fs.Events>, path: string, content: string) {
    const node = walk(path);
    const file = node.getContent();
    if (file) {
        if (file.isFile()) {
            file.demote(content);
            writeToDisk(node as INode, content);
            return;
        } else if (file.isFolder()) {
            throw new Error(`Not a file "${path}"`)
        }
    }

    node.setContent(new UnsavedFile(node, content));
    writeToDisk(node as INode, content);
}

function readFileInternal(walk: Walker<FsItem<any>, fs.Events>, path: string): string {
    const node = walk(path);
    let content = ensureNodeContent(node);
    if (content.isFile()) {
        return content.read();
    }

    throw new Error(`Not a file "${path}"`);
}

function writeToDisk(node: INode, content: string) {
    ensureParentsBeforeWritting(node._parent);
    write(node.fullPath, content, function () {
        const nodeContent = node.getContent()!
        if (nodeContent.read() === content) {
            (nodeContent as UnsavedFile).promote();
        }
    });
}

type INode = Node<FsItem<any>, fs.Events> & { _parent: INode };

function ensureParentsBeforeWritting(node: INode) {
    let content = node.getContent();
    if (!content || isNonExistingContent(content)) {
        if (!node.fullPath) { // reached the root node
            return;
        }
        ensureParentsBeforeWritting(node._parent);
        node.setContent(null);
        try {
            mkdirSync(node.fullPath);
            content = ensureNodeContent(node);
        } catch { }

    }
    if (content) {
        if (content.isFolder()) {
            return;
        }

        throw new Error(`"${node.fullPath}" is not a folder`);
    }
}
function isNonExistingContent(content: FsItem<any>): content is NonExisting {
    return !content.isFolder() && !content.isFile();
}

function ensureNodeContent(node: Node<FsItem<any>, fs.Events>): FsItem<any> {
    const content = node.getContent();
    if (content) {
        return content;
    }

    const stat = getStats(node);
    const item = createContentFromStat(node, stat);
    node.setContent(item);
    return item;
}
function createContentFromStat(node: Node<FsItem<any>, fs.Events>, stat: Stat) {
    if (stat.isFile) {
        return new File(node, stat);
    }
    if (stat.isDirectory) {
        return new Folder(node, stat);
    }

    return new NonExisting(node, stat);
}
function getStats(node: Node<FsItem<any>, fs.Events>) {
    try {
        let stat = lstatSync(node.fullPath);
        if (stat.isSymbolicLink()) {
            // resolve symlinks
            stat = lstatSync(realpathSync(node.fullPath));
        }
        return Stat.fromStat(stat, node.fullPath);
    } catch (err) {
        return Stat.nullStat(node.fullPath);
    }
}
