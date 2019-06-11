import Jasmine = require('jasmine');
import { loadSerializersTests } from './serializers';
import { loadLangServiceTests } from './langService';

// import { declareSerializersTests } from './serializers';
export function init() {
    const instance = new Jasmine({});
    beforeAll(addMatcher);
    const matcher = { toEq };
    const comparer = { compare };

    return Promise.all([
        loadSerializersTests(instance),
        loadLangServiceTests(),
    ]).then(() => instance);
    function compare<T>(actual: T, expected: T, message?: string): jasmine.CustomMatcherResult {
        return {
            pass: lighterDeepEquals(actual, expected),
            message
        };
    }
    function addMatcher() {
        instance.addMatchers(matcher);
    }
    function toEq() {
        return comparer;
    }
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