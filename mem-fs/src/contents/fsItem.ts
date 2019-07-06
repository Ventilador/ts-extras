import { Node } from "@ts-extras/tree-node";
import { lstatSync } from "fs";
import { File } from "./file";
import { Stat } from "./stat";
import { Folder } from "./folder";
import { fs } from "@ts-extras/types";

export abstract class FsItem<T>  {
    private _content: { version: number, content: T };
    protected _node: Node<FsItem<any>, fs.Events>;
    protected _stats: Stat | null;
    constructor(node: Node<FsItem<any>, fs.Events>, stats?: Stat) {
        this._node = node;
        this._content = {
            version: 0,
            content: null as any,
        }
        this._stats = stats || null;
    }
    protected abstract getContent(): T;
    upToDate() {
        return this.version() === this._content.version;
    }
    update(stats: Stat, content: T) {
        this._content = {
            version: +stats.mtime,
            content: content
        };
        this.setStats(stats);
    }
    stats() {
        this.ensureStats();
        return this._stats!;
    }
    version() {
        this.ensureStats();
        return +this._stats!.mtime;
    }
    isFile(): this is File {
        this.ensureStats();
        return this._stats!.isFile;
    }
    isFolder(): this is Folder {
        this.ensureStats();
        return this._stats!.isDirectory;
    }
    read(): T {
        this.ensureVersion();
        return this._content.content;
    }
    setStats(stats: Stat | null) {
        if (stats) {
            if (this._stats && this._stats.mtime > stats.mtime) {
                return;
            }
        }
        this._stats = stats;
        this._node.emit('change');
    }
    private ensureVersion() {
        if (this.version() !== this._content.version) {
            this._content = {
                version: this.version(),
                content: this.getContent()
            }
        }
    }
    private ensureStats() {
        if (this._stats) {
            return;
        }
        try {
            this.setStats(Stat.fromStat(lstatSync(this._node.fullPath), this._node.fullPath));
        } catch{
            this._stats = NonStats;
        }
    }
}
const NonStats: Stat = {
    isFile: false,
    isDirectory: false,
    mtime: new Date('invalid'),
    size: NaN,
    fileName: 'unknown'
}


