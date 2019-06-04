import { ISerializer } from './types';
import { Reader } from '../parser';

export const F64 = {
  parse: (val: Reader) => {
    if (val.peek() === '-') {
      val.skip();
      return -+val.collectNumber();
    }
    return +val.collectNumber();
  },
  stringify: (val: number) => val + ''
} as ISerializer<number>;
