export namespace fs {
    export type Stat = {
        mtime: Date;
        size: number;
        fileName: string;
        isFile: boolean;
        isDirectory: boolean;
    };
    export type WatchCallback = (eventName: string, newStats: Stat) => any;
    export type Unwatch = () => void;
    export type MemoryFileSystem = {
        dispose: () => void;
        watchFile: (filePath: string, cb: WatchCallback) => Unwatch;
        watchDirectory: (path: string, cb: WatchCallback) => Unwatch;
        readFile: (path: string) => string;
        writeFile: (path: string, content: string) => void;
        writeVirtualFile: (fromPath: string, toPath: string, parser: (content: string) => string) => void;
        readdir: (path: string) => string[];
        stat: (path: string) => Stat;
        fileExists: (path: string) => boolean;
        directoryExists: (path: string) => boolean;
        deleteFile: (path: string) => void;
        realpath: (path: string) => string;
        readDirectory: (path: string, extensions?: ReadonlyArray<string>, exclude?: ReadonlyArray<string>, include?: ReadonlyArray<string>, depth?: number) => string[];
        promises: AsyncMemoryFileSystem;
    };

    type AsyncMemoryFileSystem = {
        [key in keyof PromiseableMethods]: (...args: Parameters<MemoryFileSystem[key]>) => Promise<ReturnType<MemoryFileSystem[key]>>;
    };
    type PromiseableMethods = Pick<
        MemoryFileSystem,
        'directoryExists' | 'fileExists' | 'readdir' | 'readFile' | 'stat' | 'writeFile' | 'deleteFile'
    >;
    export type Events = "add" | "addDir" | "change" | "unlink" | "unlinkDir";
}