import { ISerializer } from '../interfaces';
import { Reader } from '../parser';

export const F64 = {
  parse: (val: Reader) => {
    if (val.peek() === '-') {
      val.skip();
      return -+val.toString();
    }
    return +val.toString();
  },
  stringify: (val: number) => val + ''
} as ISerializer<number>;
