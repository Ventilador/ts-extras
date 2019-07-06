import { ISerializer } from '../interfaces';
import { Reader } from '../parser';
import { getToken, AllConstructors } from './serializersSingleton';

const allConstructorsVar = 'a';
const readerArg = 'b';
const valueArg = 'c';
const stringifyFn = 'd';
const parseFn = 'e';
const wrapperFn = 'f';
const keys = Symbol('isReady');
export type IMoveMetadata = {
  name: string;
  arg: ISerializer;
  optional: boolean
}
export function move(arg: ISerializer, proto: any, name: string, optional: boolean): void;
export function move(arg: ISerializer, proto: { [keys]: IMoveMetadata[] }, name: string, optional: boolean) {
  if (!hasProp(proto, keys)) {
    proto[keys] = [];
  }
  if (optional) {
    arg = optionalWrap(arg);
  }
  proto[keys].push({ name, arg, optional });
}
const hasProp = Function.prototype.call.bind(Object.prototype.hasOwnProperty);

export function collectMetadata(target: Function) {
  const metadata: IMoveMetadata[] = [];
  for (let cur = target.prototype; cur && cur !== Object.prototype && cur !== Function.prototype; cur = Object.getPrototypeOf(cur)) {
    if (hasProp(cur, keys)) {
      cur[keys].reduce(push, metadata)
    }
  }
  return metadata.sort(byName);
}

function push(prev: IMoveMetadata[], cur: IMoveMetadata) {
  prev.push(cur);
  return prev;
}

export function flush(target: ISerializer & Function): any {
  const decoratedProps: IMoveMetadata[] = collectMetadata(target as Function);
  if (!decoratedProps.length) {
    // throw new Error(`No decorated properties found in "${target.name}"`);
    return;
  }
  target.parse = createParser(
    decoratedProps,
    createWrapper(target)
  );
  target.stringify = createSerializer(
    decoratedProps
  );
}
const optional = Symbol('Optional');
export const wrappedSerializer = Symbol('isOptionalSerializerWrapper');
export function isOptionalSerializerWrapper(value: any): boolean {
  return !!(value && value[wrappedSerializer]);
}
export function unwrapOptionalSerializer(value: any) {
  return value[wrappedSerializer] as ISerializer;
}

export function optionalWrap(target: ISerializer): ISerializer {
  if (target[optional]) {
    return target[optional];
  }

  return target[optional] = { parse, stringify, [wrappedSerializer]: target };

  function stringify(value: any) {
    if (value === undefined) {
      return '\0';
    }
    return target.stringify(value);
  }
  function parse(value: Reader) {
    if (value.peek() === '\0') {
      return undefined;
    } else {
      return target.parse(value);
    }
  }
}

function createWrapper(target: any) {
  if (isClass(target)) {
    return createClassWrapper(target);
  }

  return createFunctionWrapper(target);
}
function createFunctionWrapper(target: Function) {
  fake.prototype = target.prototype;
  return function (value) {
    const instance = new fake();
    Object.assign(instance, value);
    target.call(instance, value);
    return instance;
  }
  function fake() { }
}
function createClassWrapper(target) {
  class Wrapper extends target {
    constructor(value) {
      super(value);
      Object.assign(this, value);
    }
  };
  return function (value) {
    return new Wrapper(value);
  }
}
function isClass(target: ISerializer) {
  return (Function.prototype.toString.call(target) as string).startsWith('class');
}



function createParser(props: IMoveMetadata[], wrapper: Function) {
  return new Function(
    allConstructorsVar,
    parseFn,
    wrapperFn,
    `
return function(${readerArg}){
    return ${wrapperFn}({
        ${props
      .map((prop, i) => {
        return `${prop.name}: ${parseFn}(${allConstructorsVar}.${getToken(prop.arg)}, ${readerArg})`;
      })
      .join(',\r\n\t\t')}
    });
}`
  )(AllConstructors, parseHelper, wrapper) as (val: Reader) => any;
}

function parseHelper<T>(serializer: ISerializer<T>, reader: Reader): T {
  return serializer.parse(reader.slice(reader.collectNumber()));
}

function stringifyHelper<T>(serializer: ISerializer<T>, val: T) {
  const valText = serializer.stringify(val);
  return `${valText.length}|${valText}`;
}

function createSerializer(arg: IMoveMetadata[]) {
  return new Function(
    allConstructorsVar,
    stringifyFn,
    `
return function (${valueArg}) {
  return [
    ${arg.map(generateStringifyCode).join(',\r\n    ')}
  ].join('');
};`
  )(AllConstructors, stringifyHelper) as (val: string) => any;
}

function generateStringifyCode(prop: IMoveMetadata) {
  return `${stringifyFn}(${allConstructorsVar}.${getToken(prop.arg)}, ${toValueDotProp(prop)})`;
}

function toValueDotProp(item: IMoveMetadata) {
  return `${valueArg}.${item.name}`;
}

function byName(a: any, b: any) {
  // dont really care about decending or ascending, just that its sorted, and always in the same way
  return a.name < b.name ? 1 : -1;
}
