import Jasmine = require('jasmine');
import { join } from 'path';
import { existsSync } from 'fs';

const rootPath = process.cwd();
const packajeJson = require('./../package.json');
const workspaces: string[] = packajeJson.workspaces;
const instance = new Jasmine({});
const comparer = { compare };

(instance.env as any).configure({
    specFilter: function (spec: any) {
        return !spec.getFullName().includes('pending...');
    }
});

beforeAll(() => instance.addMatchers({ toEq }));
Promise.all(workspaces
    .map(i => join(rootPath, i, 'tests/dist/index.js'))
    .filter(existsSync)
    .map(require)
    .map(callInit))
    .then(() => {
        instance.execute();
    });
function lighterDeepEquals(original: any, copy: any): boolean {
    if (original === copy) {
        return true;
    }

    const typeofA = typeof original;
    const typeofB = typeof copy;
    if (typeofA !== typeofB) {
        return false;
    }

    if (shouldHaveLeftWithTripleEquals(typeofA)) {
        return false;
    }

    if (isNumber(typeofA)) {
        return isNaN(original) && isNaN(copy);
    }

    if (shouldLeaveWithToStringCheck(typeofA)) {
        return (original + '') === (copy + '');
    }

    if (Array.isArray(original)) {
        if (Array.isArray(copy)) {
            if (original.length !== copy.length) {
                return false;
            }

            return original.every((val, index) => lighterDeepEquals(val, copy[index]));
        }
        return false;
    }

    if (original instanceof Date) {
        return +original === +copy;
    }

    if (!original) {
        return copy === null;
    }


    const aKeys = getKeys(original);
    for (const aKey of aKeys) {
        if (!lighterDeepEquals(original[aKey], copy[aKey])) {
            return false;
        }
    }

    const bKeys = getKeys(copy);
    const aKeysSet = new Set(aKeys);
    for (const bKey of bKeys) {
        if (!aKeysSet.has(bKey) && copy[bKey] !== undefined) {
            return false;
        }
    }
    return true;

}

function compare<T>(actual: T, expected: T, message?: string): jasmine.CustomMatcherResult {
    return {
        pass: lighterDeepEquals(actual, expected),
        message
    };
}

function toEq() {
    return comparer;
}
function shouldHaveLeftWithTripleEquals(value: string) {
    return value === 'string' || value === 'function' || value === 'boolean';
}

function shouldLeaveWithToStringCheck(val: string) {
    return val === 'symbol';
}
function isNumber(val: string) {
    return val === 'number';
}

const hasProp = Function.prototype.call.bind(Object.prototype.hasOwnProperty);
function getKeys(obj: any) {
    const keys = [];
    for (let i in obj) {
        if (hasProp(obj, i)) {
            keys.push(i);
        }
    }
    return keys;
}

function callInit(val: { init: () => Promise<unknown> }) {
    return Promise.resolve(val.init());
}
