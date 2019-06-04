
import { createServer } from 'net';
import { TCP_PORT } from './../constants';

export function createTcpListener(onConnection: (value: any) => void, port?: number) {
    return createServer((socket) => {

    }).listen(port || TCP_PORT);
}


