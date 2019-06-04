// TODO enhace function generation with hardcoded transformers
import { Thru } from '../types/thru';
import { ISerializer } from '../types/types';
const transformations = 'a';
const originalFn = 'b';
const cache: Record<
  'parse' | 'stringify',
  Record<number, (orig: Function, transformers: ISerializer<any>[]) => Function>
> = {
  parse: {},
  stringify: {}
};
const argMap = Symbol('argMap');

class Base {
  [key: number]: ISerializer<any>;
  readonly length: number = 0;
  readonly size: number;
  add(index: number, value: ISerializer<any>) {
    if (this.length < index + 1) {
      while (Base.prototype.size <= index) {
        Base.prototype[(Base.prototype as { size: number }).size++] = Thru;
      }
      (this as { length: number }).length = index + 1;
    }
    this[index] = value;
  }
}

(Base.prototype as { size: number }).size = 0;

const voidSerializer = {
  parse() {},
  stringify() {
    return '';
  }
};

export function Method(ctor?: ISerializer<any>) {
  return function Method(proto: any, name: string) {
    const items: IMetadataItem[] = proto.constructor.METADATA;
    if (!proto[name][argMap]) {
      throw 'Serializers not found';
    }
    items.push({
      name,
      transforms: proto[name][argMap],
      returns: ctor || voidSerializer
    });
  };
}

export interface IMetadataItem {
  name: string;
  transforms: ISerializer<any>[];
  returns: ISerializer<any>;
}

export function Argument<T>(ctor: ISerializer<T>) {
  return function(proto: { [name: string]: { [key: string]: Base } }, name: string, index: number) {
    if (!proto[name][argMap as any]) {
      proto[name][argMap as any] = new Base();
    }

    proto[name][argMap as any].add(index, ctor);
  };
}

export function argWrapper(transformers: ISerializer<any>[], original: Function, mode: 'parse' | 'stringify') {
  const size = transformers.length;
  if (!cache[mode][size]) {
    cache[mode][size] = createByMode(size, mode);
  }
  return cache[mode][size](original, transformers);
}

// Creates the following function
/**
 * function (originalFn, transformations){
 *      return function(){
 *          return originalFn.call(this,
 *                  transformations[0].parse(arguments[0]),
 *                  transformations[1].parse(arguments[1]),
 *                  transformations[2].parse(arguments[2]),
 *                  ...more
 *                  )
 *      }
 * }
 * var temp; // used to cache some accessors
 */
function createByMode(
  size: number,
  mode: 'parse' | 'stringify'
): (originalFn: Function, transform: ISerializer<any>[]) => Function {
  return new Function(
    originalFn,
    transformations,
    `
return function () {
    return ${originalFn}.call(this${Array.from(new Array(size))
      .map(
        (_, i) => `,
                    ${transformations}[${i}].${mode}(arguments[${i}])`
      )
      .join('')});
};`
  ) as any;
}
