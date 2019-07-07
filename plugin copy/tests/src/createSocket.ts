import { createConnection, Socket } from "net";
import { TCP_PORT } from '@ts-extras/constants'
export function createSocket() {
    return new Promise<Socket>(resolve => {
        let socket: Socket;
        listen();

        function retry() {
            socket.end();
            setTimeout(listen, 1000);
        }

        function listen() {
            socket = createConnection({ port: TCP_PORT, host: '0.0.0.0' });
            socket.on('error', retry);
            socket.on('connect', resolve)
        }
    })
}