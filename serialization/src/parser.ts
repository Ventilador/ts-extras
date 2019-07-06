const valueFn = (val: any) => () => val;
const emptyBuf = Buffer.from('');
export class Reader {
  // tslint:disable-next-line
  public static readonly Empty: Reader = createEmpty(Reader);
  private index: number;
  private text: Buffer;
  private size: number;
  constructor(buf: Buffer | string, index = 0, size = 0) {
    this.index = index;
    this.text = Buffer.from(buf as any);
    this.size = size || Buffer.byteLength(this.text);
  }

  bufSlice(amount: number) {
    if (!amount) {
      return emptyBuf;
    }
    if (this.index + amount <= this.size) {
      const other = this.text.slice(this.index, this.index + amount);
      this.index += amount;
      return other;
    }
    
    throw new Error('Out of bounds');
  }
  toString() {
    return this.text.toString('utf8', this.index, this.size);
  }
  skip() {
    this.index++;
    return this.index < this.size;
  }

  peek() {
    return String.fromCharCode(this.text.readUInt8(this.index));
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
    let code = 0;
    for (let i = this.index; i < this.size; i++) {
      if (isNumber(code = text.readUInt8(i))) {
        collected += String.fromCharCode(code);
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
const isReader = Symbol('isReader');
Reader.Empty[isReader] = Reader.prototype[isReader] = true;
export function assertIsReader(val: any, message?: string): Reader {
  if (val && val[isReader]) {
    return val;
  }

  throw new Error(message || `Value is not a reader ${JSON.stringify(val)}`);
}
const Char_0 = '0'.charCodeAt(0) - 1; // inclusive
const Char_9 = '9'.charCodeAt(0) + 1; // inclusive
export function isNumber(char: number) {
  return char > Char_0 && char < Char_9;
}
function createEmpty(ctor: any) {
  const empty = new ctor('', 0, 0);
  const emptyString = valueFn('');
  const returnsFalse = valueFn(false);
  const emptyRef = valueFn(empty);
  const emptyNumb = valueFn(0);

  empty.collect = Array;
  empty.toString = emptyString;
  empty.peek = emptyString;
  empty.hasMore = returnsFalse;
  empty.skip = returnsFalse;
  empty.slice = emptyRef;
  empty.collectNumber = emptyNumb;

  return empty;
}
