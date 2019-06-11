import { promisify } from 'util';
import *as fs from 'fs';
import { dirname } from 'path';
const writeToFs = promisify(fs.writeFile);
const stat = promisify(fs.stat);
const mkdir = promisify(fs.mkdir);
export function createWriteQueue() {
    const queue: [string, any][] = [];
    let running = 0;

    let resolve: Function, reject: Function;
    let writeFile = (fileName: string, data: string) => {
        if (running > 9) {
            queue.push([fileName, data]);
        } else {
            running++;
            writeSafe(fileName, data, good, bad);
        }
    }
    let dirSincPromise = Promise.resolve();
    const touched = {} as Record<string, true | undefined>;
    return {
        writeFile,
        flush,
    }

    function flush(): Promise<void> {
        if (!running && !queue.length) {
            writeFile = noop;
            return Promise.resolve();
        }
        return new Promise((s, f) => {
            resolve = () => s();
            reject = f;
        });
    }

    function writeSafe(fileName: string, data: string, good: any, bad: any) {
        ensureDirQueued(dirname(fileName))
            .then(_ => writeToFs(fileName, data))
            .then(good, bad);
    }

    function ensureDirQueued(dir: string) {
        if (touched[dir]) {
            return Promise.resolve();
        }
        return dirSincPromise = dirSincPromise.then(_ => internalEnsureDir(dir, touched));
    }

    function good() {
        running--;
        if (queue.length) {
            writeFile.apply(null, queue.shift()!);
        } else if (!running) {
            resolve();
        }
    }

    function bad(err: Error) {
        queue.length = 0;
        writeFile = noop;
        reject(err);
    }
}

function internalEnsureDir(dir: string, touched: Record<string, true | undefined>): Promise<void> {
    return stat(dir)
        .then(s => {
            if (s.isDirectory()) {
                touched[dir] = true;
                return;
            }
            throw new Error(`Dir is a file "${dir}"`);
        })
        .catch((err: NodeJS.ErrnoException) => {
            if (err.code === 'ENOENT') {
                return internalEnsureDir(dirname(dir), touched).then(_ => {
                    return mkdir(dir).then(_ => noop(touched[dir] = true));
                });
            } else {
                throw err;
            }
        })
}
function noop(...args: any[]): any
function noop() {

}
