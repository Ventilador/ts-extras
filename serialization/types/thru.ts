import { ISerializer } from './types';
import { Reader } from '../parser';
// tslint:disable-next-line
export const Thru = {
  parse: thru,
  stringify: thru
} as ISerializer<string>;
function thru(val: Reader | string): string {
  return val ? (typeof val === 'string' ? val : val.toString()) : '';
}
const tracker = Symbol('tracker');

// tslint:disable-next-line
export function FromEnum(enm: any): ISerializer<any> {
  if (enm[tracker]) {
    return enm[tracker];
  }
  const size = getSize(enm);
  return (enm[tracker] = {
    parse: (val: Reader) => +val.slice(size).toString(),
    stringify: (val: number) => toFixed(val, size)
  });
}

function toFixed(value: string | number, size: number) {
  value = value + '';
  if (value.length === size) {
    return value;
  }

  if (value.length < size) {
    return '0'.repeat(size - value.length) + value;
  }

  throw new Error('Invalid enum value');
}

function getSize(val: any): number {
  const keys = Object.keys(val);
  let size = 0;
  for (const key of keys) {
    if (val[val[key]] === undefined) {
      throw new Error('Invalid enum ' + JSON.parse(val));
    }
    const asNum = +key;
    if (!isNaN(asNum) && size < asNum) {
      size = asNum;
    }
  }
  return size.toString().length;
}
