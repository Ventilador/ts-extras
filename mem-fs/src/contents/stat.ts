import { Stats as FsStatType } from "fs";
export type Stats = { mtime: Date, size: number, isFile: boolean, isDirectory: boolean };
export class Stat {
    static fromStat(stat: FsStatType, name: string) {
        return new Stat({
            mtime: stat.mtime,
            size: stat.size,
            isDirectory: stat.isDirectory(),
            isFile: stat.isFile(),
        }, name);
    }
    static virtualStat(name: string, size: number) {
        return new Stat({
            mtime: new Date,
            size: size,
            isFile: true,
            isDirectory: false
        }, name);
    }
    static nullStat(name: string) {
        return Stat.fromStat(emptyStyat, name);
    }
    public readonly mtime: Date;
    public readonly size: number;
    public readonly fileName: string;
    public readonly isFile: boolean;
    public readonly isDirectory: boolean;
    private constructor(stat: Stats, name: string) {
        this.fileName = name;
        this.size = stat.size;
        this.mtime = stat.mtime;
        this.isFile = stat.isFile
        this.isDirectory = stat.isDirectory;
    }
}
function returnFalse() {
    return false;
}

const emptyStyat = {
    size: -1,
    mtime: new Date('invalid'),
    isFile: returnFalse,
    isDirectory: returnFalse
} as any;
