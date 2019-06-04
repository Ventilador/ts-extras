import { ISerializer } from '../types/types';
import { Reader } from '../parser';
import { getToken, AllConstructors } from './serializersSingleton';
import { Serializer } from './serializer';

const allConstructorsVar = 'a';
const readerArg = 'b';
const valueArg = 'c';
const stringifyFn = 'd';
const parseFn = 'e';
const originalParseFn = 'f';
const originalStringifyFn = 'g';
const keys = Symbol('isReady');
export function Move(): (proto: any) => any;
export function Move(ctor: ISerializer<any>): (proto: any, name: string) => void;
export function Move(ctor?: ISerializer<any>) {
  if (ctor) {
    return function decorator(proto: any, name: string) {
      if (!proto[keys]) {
        proto[keys] = [];
      }
      proto[keys].push({ name, ctor });
    };
  } else {
    return function decorator(ctor: ISerializer<any>) {
      const decoratedProps = (ctor as any).prototype[keys].sort(byName);
      ctor.parse = createParser(
        decoratedProps,
        ctor.parse && ctor.parse !== Serializer.parse ? ctor.parse : thru
      );
      ctor.stringify = createSerializer(
        decoratedProps,
        ctor.stringify && ctor.stringify !== Serializer.stringify ? ctor.stringify : thru
      );
    };
  }
}

function thru(val: any) {
  return val;
}
interface IItem {
  name: string;
  ctor: ISerializer<any>;
}

function createParser(props: IItem[], originalParser: any) {
  return new Function(
    allConstructorsVar,
    parseFn,
    originalParseFn,
    `
return function(${readerArg}){
    return ${originalParseFn}({
        ${props
      .map((prop, i) => {
        return `${prop.name}: ${parseFn}(${allConstructorsVar}.${getToken(prop.ctor)}, ${readerArg})`;
      })
      .join(',\r\n\t\t')}
    });
}`
  )(AllConstructors, parseHelper, originalParser) as (val: Reader) => any;
}

function parseHelper<T>(serializer: ISerializer<T>, reader: Reader): T {
  return serializer.parse(reader.slice(reader.collectNumber()));
}

function stringifyHelper<T>(serializer: ISerializer<T>, val: T) {
  if (typeof serializer === 'function') {
    val = new (serializer as any)(val);
  }
  const valText = serializer.stringify(val);
  return `${valText.length}|${valText}`;
}

function createSerializer(arg: IItem[], originalStringify: Function) {
  return new Function(
    allConstructorsVar,
    stringifyFn,
    originalStringifyFn,
    `
return function (${valueArg}) {
  ${valueArg}=${originalStringifyFn}(${valueArg});
  return [
    ${arg.map(generateStringifyCode).join(',\r\n    ')}
  ].join('');
};`
  )(AllConstructors, stringifyHelper, originalStringify) as (val: string) => any;
}

function generateStringifyCode(prop: IItem) {
  return `${stringifyFn}(${allConstructorsVar}.${getToken(prop.ctor)}, ${toValueDotProp(prop)})`;
}

function toValueDotProp(item: IItem) {
  return `${valueArg}.${item.name}`;
}

function byName(a: any, b: any) {
  // dont really care about decending or ascending, just that its sorted, and always in the same way
  return a.name < b.name ? 1 : -1;
}
