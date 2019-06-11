import { isNumber } from './parser';
import { Readable } from 'stream';

export function messageJoiner(socket: Readable, push: (data: any) => void) {
  socket.on('data', transform);
  let chained: Buffer | null = null;
  let bufSize = 0;
  function transform(data: Buffer) {
    if (chained) {
      chained = Buffer.concat([chained, data]);
    } else {
      chained = data;
    }
    bufSize = Buffer.byteLength(chained);
    let index = 0;

    // while the buffer has responses
    for (let size = calculateSize(); size + index + 1 < chained.length; size = calculateSize()) {
      index += size.toString().length + 1;
      push(chained.slice(index, index + size)); // push the chunk into the stream
      index += size; // increment "size" to the index so next slices are done from there (skip already read)
    }

    if (index) {
      chained = chained.slice(index); // skip already read
    }
  }

  function calculateSize(): number {
    let collected = '';
    const text = chained;
    let code = 0;
    for (let i = 0; i < bufSize; i++) {
      if (isNumber(code = text.readUInt8(i))) {
        collected += String.fromCharCode(code);
      } else {
        return +collected;
      }
    }

    return 0;
  }
}
