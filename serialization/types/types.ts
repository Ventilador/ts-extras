import { Reader } from '../parser';

export interface ISerializer<T> {
  parse(value: Reader): T;
  stringify(value: T): string;
}
