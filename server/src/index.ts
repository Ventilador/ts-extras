
import { createServer } from 'net';
import { TCP_PORT } from '@ts-utils/constants';
import { messageJoiner } from '@ts-utils/serialization';

export function createTcpListener(onConnection: (value: any) => void, port?: number) {
    return createServer((socket) => {
        messageJoiner(socket, onConnection);
    }).listen(port || TCP_PORT);
}


