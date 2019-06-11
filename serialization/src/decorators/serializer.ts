import { Reader } from '../parser';

export class Serializer {
  static parse<T= any>(_: Reader): T {
    return null as any;
  }
  static stringify<T= any>(_: T): string {
    return '';
  }
}
