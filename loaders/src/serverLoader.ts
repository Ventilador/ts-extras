import { loaders } from '@ts-extras/types';
import { LineAndCharacter, TextRange } from 'typescript';

export function createServerLoader(info: loaders.BaseLoader, cache: loaders.Cache): loaders.ServerLoader {
    const {
        redirect,
        wasRedirected,
        multiFile,
        handles,
        wasRedirectedFrom,
        extension,
        toRedirected,
        dirname,
        parse,
    } = info;

    return {
        dirname,
        extension,
        handles,
        multiFile,
        redirect,
        wasRedirected,
        wasRedirectedFrom,
        moveFile,
        movePosition,
        moveLineAndChar,
        movePositionWithinFile,
        outOfBounds,
        toRedirected,
        parse,
    };

    function outOfBounds(from: string, to: string, pos: number | TextRange): boolean {
        if (typeof pos === 'number') {
            if (handles(from)) {
                const { length } = cache.get(from, to);
                return !isBetween(pos, 0, length);
            } else if (handles(to)) {
                const { start, end } = cache.get(to, from);
                return !isBetween(pos, start, end);
            }
            return false;
        } else {
            return outOfBounds(from, to, pos.end) || outOfBounds(from, to, pos.pos);
        }
    }

    function movePositionWithinFile(from: string, to: string, pos: number): number {
        if (handles(from)) {
            const { start, end } = cache.get(from, to);
            return between(pos - start, start, end);
        } else if (handles(to)) {
            const { start, end } = cache.get(to, from);
            return between(start + pos, start, end);
        }

        throw new Error(`Does not handles either file names "${from}" "${to}"`);
    }


    function moveLineAndChar(from: string, to: string, info: LineAndCharacter) {
        return info;
    }

    function moveFile(_from: string, _to: string, fileName: string): string {
        return wasRedirected(fileName) || fileName;
    }

    function movePosition(from: string, to: string, pos: number): number {
        if (handles(from)) {
            const item = cache.get(from, to)!;
            return pos - item.start;
        } else if (handles(to)) {
            const item = cache.get(to, from)!;
            return item.start + pos;
        }

        throw new Error(`Does not handles either file names "${from}" "${to}"`);
    }

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
