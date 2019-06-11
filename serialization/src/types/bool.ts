import { ISerializer } from '../interfaces';
import { Reader } from '../parser';
// tslint:disable-next-line
export const Bool = {
  parse: (val: Reader) => val.toString() !== '0',
  stringify: (val: boolean) => (val ? '1' : '0')
} as ISerializer<boolean>;
