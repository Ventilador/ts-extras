import { isNumber } from './parser';
import { Socket } from 'net';

export function messageJoiner(socket: Socket, push: (value: Buffer, write: (chunk: Buffer | string) => void) => void) {
  socket.on('data', transform);
  let chained: Buffer | null = null;
  let bufSize = 0;
  return writeBack;
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
      push(chained.slice(index, index + size), writeBack); // push the chunk into the stream
      index += size; // increment "size" to the index so next slices are done from there (skip already read)
    }

    if (index) {
      chained = chained.slice(index); // skip already read
    }
  }

  function writeBack(chunk: Buffer | string) {
    socket.write(chunk);
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
