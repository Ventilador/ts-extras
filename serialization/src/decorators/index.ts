import { decorateMethod } from "./method";
import { decorateReturn } from "./returns";
import { MethodDecoratorType, ArgumentSerializer, ISerializer, ReturnSerializer, MoveSerializer, MoveDecoratorType, MoveMethodDecoratorType } from "../interfaces";
import { Thru } from "../types/thru";
import { F64 } from "../types/f64";
import { Bool } from "../types/bool";
import { flush, move } from "./moveImpl";
export const Enum = Number;
export { Serializer } from './serializer';
import { Reader } from '../parser';
import { FullJson } from "../types";
export { collectMetadata, IMoveMetadata, unwrapOptionalSerializer, isOptionalSerializerWrapper } from './moveImpl';
export { Metadata, MethodMetadata, IO } from './metadata';
export function Method(...args: ArgumentSerializer[]): MethodDecoratorType {
    return function (proto: any, name: string) {
        decorateMethod(proto, name, args.map(getSerializer, name));
    };
}
export function Returns(arg?: ReturnSerializer): MethodDecoratorType {
    return function (proto: any, name: string) {
        decorateReturn(proto, name, arg && getSerializer.call(name, arg));
    }
}

export function Move(): MoveDecoratorType
export function Move(arg: MoveSerializer, optional?: true): MoveMethodDecoratorType
export function Move(arg?: MoveSerializer, optional = false): MoveDecoratorType | MoveMethodDecoratorType {
    if (arg) {
        return function (proto, name) {
            move(getSerializer.call(name, arg), proto, name, optional);
        }
    } else {
        return flush;
    }
}


function getSerializer(this: string, value: ArgumentSerializer, index: number = -1): ISerializer<any> {
    switch (value) {
        case String:
            return Thru;
        case Number:
            return F64;
        case Boolean:
            return Bool;
        case Object:
            return FullJson;
        default:
            if (Array.isArray(value) && value.length === 1) {
                return makeArraySerializer(value[0]);
            }
            if (assertIsSerializer(value)) {
                return value;
            }
            if (assertIsEnum(value)) {
                return F64;
            }
    }

    throw new Error(makeErrorMessage(this, index));
}

function assertIsEnum(value): boolean {
    return Object.keys(value)
        .every(isValidEnumCheck, value);
}
/**
 * Enums in typescript are map boths strings and number keys to each other
 * like this
 * enum MyEnum {
 *  a: 0,
 *  b: 1,
 * }
 * 
 * transpiles to
 * 
 * const MyEnum = {
 *  '0': 'a',
 *  'a': '0',
 *  '1': 'b',
 *  'b': '1',
 * }
 * 
 */
function isValidEnumCheck(this: any, val: string | number): boolean {
    return str(val) === str(this[this[val]]) // for example          '0' == MyEnum[MyEnum[0] == 'a'] == '0'
        && str(this[val]) === str(this[this[this[val]]]) //  MyEnum['0'] == MyEnum[MyEnum[MyEnum['0'] == 'a'] == '0'] == 'a'
}

function str(val: string | number) {
    return val.toString();
}

function makeErrorMessage(name: string, index: number) {
    if (index === -1) {
        return `Return type for method "${name}" is not a valid ArgumentSerializer`;
    } else {
        return `Argument at ${index} on method "${name}" is not a valid ArgumentSerializer`;
    }
}

function assertIsSerializer(value: any): value is ISerializer<any> {
    return typeof value.parse === 'function' && typeof value.stringify === 'function'
}
export function isArraySerializerWrapper(value: any) {
    return !!(value && value[wrappedSerializer]);
}
export function unwrapArraySerializer(value: any) {
    return value[wrappedSerializer] as ISerializer;
}
const wrappedSerializer = Symbol('arraySerializer');

function makeArraySerializer(argSerializer: ArgumentSerializer): ISerializer<any> {
    const serializer = getSerializer.call(argSerializer.constructor.name, argSerializer);
    return Object.defineProperty({ parse, stringify }, wrappedSerializer, {
        value: serializer,
        writable: false,
        enumerable: false,
        configurable: false
    });
    function parse(str: Reader) {
        return str.collect(str.collectNumber())
            .map((value) => {
                return serializer.parse(str.slice(value));
            })
    }
    function stringify(value: any[]) {
        const inString = value.map((value) => {
            return serializer.stringify(value);
        });
        const sizes = inString.map(i => i.length).join('|');
        const all = `${sizes}|${inString.join('')}`
        return `${inString.length}|${all}`;
    }

}
