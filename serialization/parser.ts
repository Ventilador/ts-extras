import { ISerializer } from './types/types';
import { Serializer } from './decorators/serializer';

const valueFn = (val: any) => () => val;

export function toBuffer<T extends Serializer>(obj: T, serializer: ISerializer<T>) {
  const asText = serializer.stringify(obj);
  return Buffer.from(asText.length + '|' + asText);
}
export function fromBuffer<T>(buffer: Buffer, serializer: ISerializer<T>): T {
  return serializer.parse(new Reader(buffer));
}

export class Reader {
  // tslint:disable-next-line
  public static readonly Empty: Reader = {
    toString: valueFn(''),
    slice: () => Reader.Empty,
    collect: valueFn([]),
    collectNumber: valueFn(0)
  } as any;
  private index: number;
  private text: string;
  private size: number;
  constructor(buf: Buffer | string, index = 0, size = 0) {
    this.index = index;
    this.text = buf.toString('utf-8');
    this.size = size || this.text.length;
  }

  toString() {
    return this.text.slice(this.index, this.size);
  }
  skip() {
    this.index++;
    return this.index < this.size;
  }

  peek() {
    return this.text[this.index];
  }

  slice(amount: number) {
    if (!amount) {
      return Reader.Empty;
    }
    if (this.index + amount <= this.size) {
      const other = new Reader(this.text, this.index, this.index + amount);
      this.index += amount;
      return other;
    }
    throw new Error('Out of bounds');
  }

  collect(amount: number): number[] {
    const arr = new Array(amount);
    for (let i = 0; i < amount; i++) {
      arr[i] = this.collectNumber();
    }
    return arr;
  }

  collectNumber(): number {
    let collected = '';
    const text = this.text;
    const l = this.size;
    for (let i = this.index; i < l; i++) {
      if (isNumber(text[i])) {
        collected += text[i];
      } else {
        this.index = i + 1;
        return +collected;
      }
    }

    return +collected;
  }

  hasMore() {
    return this.index < this.size;
  }
}

export function isNumber(str: string) {
  return (
    str === '1' ||
    str === '2' ||
    str === '3' ||
    str === '4' ||
    str === '5' ||
    str === '6' ||
    str === '7' ||
    str === '8' ||
    str === '9' ||
    str === '0'
  );
}
