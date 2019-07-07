import { Metadata, RequestSerializer, messageJoiner, ResponseSerializer, Parser } from '@ts-extras/serialization';
import { createServer } from './createChild';
import { ChildProcess } from 'child_process';
import { createSocket } from './createSocket';
import { Socket } from 'net';
import { LanguageServerAsync } from '@ts-extras/shared';
export async function createLanguageService(metadata: Metadata): Promise<LanguageServerAsync> {
    let child: ChildProcess = await createServer();
    let socket: Socket = await createSocket();
    afterAll(function () {
        if (child) {
            child.kill();
            child = null as any;
        }
        if (socket) {
            socket.end();
            socket = null as any;
        }
    });
    let g_id = 0;
    let cbs = {} as Record<number, { resolve: Function, reject: Function, parser: Parser<any[]> }>;
    const write = messageJoiner(socket, function (buf: Buffer) {
        const { id, value, error } = ResponseSerializer.parse(buf);
        if (!cbs[id]) {
            return;
        }
        const info = cbs[id];
        delete cbs[id];
        if (error) {
            info.reject(JSON.parse(error));
        } else {
            info.resolve(info.parser(value))
        }
    });
    return LanguageServerAsync.Metadata.methods.reduce(function (prev, cur) {
        (prev as any)[cur.name] = function (...args: any[]) {
            return new Promise((resolve, reject) => {
                const id = g_id++;
                write(RequestSerializer.stringify({
                    action: cur.name,
                    id: id,
                    args: cur.args.stringifier(args).toString()
                }));
                cbs[id] = { resolve, reject, parser: cur.returns.parser }
            })
        };

        return prev;
    }, {} as LanguageServerAsync);
}

