import { ISerializer } from '../interfaces';
import { Reader, assertIsReader } from '../parser';

export const Thru = {
  parse: (val: Reader) => assertIsReader(val).toString(),
  stringify: (val: string) => assertIsString(val),
} as ISerializer<string>;

export function assertIsString(val: any): string {
  if (typeof val === 'string') {
    return val;
  }
  throw new Error(`Value is not a string "${JSON.stringify(val)}"`);
}