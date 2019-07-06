
import { createServer } from 'net';
import { TCP_PORT } from '@ts-extras/constants';
import { messageJoiner } from '@ts-extras/serialization';

export function createTcpListener(onConnection: (value: Buffer, write: (chunk: string | Buffer) => void) => void) {
    return createServer((socket) => {
        messageJoiner(socket, onConnection);
    }).listen(TCP_PORT);
}


