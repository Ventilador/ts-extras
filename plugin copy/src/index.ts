import { server, LanguageService } from 'typescript/lib/tsserverlibrary';
import { createTcpListener } from '@ts-extras/server';
import { MethodMetadata, RequestSerializer, ResponseSerializer, Reader } from '@ts-extras/serialization';
import { LanguageServerAsync } from '@ts-extras/shared';
import { performActionFactory, ActionPerformer } from './actions';
export default function () {
    return { create };
    function create(info: server.PluginCreateInfo): LanguageService {
        intercept(performActionFactory(info))
        return info.languageService;
    }
}

function intercept(performAction: ActionPerformer) {
    const methodParsers: Record<string, MethodMetadata> = LanguageServerAsync.Metadata.methods.reduce(dictMethodParsers, {})
    createTcpListener(function (chunk: Buffer, write: (chunk: Buffer | string) => void) {
        const { args, action, id } = RequestSerializer.parse(chunk);
        if (!methodParsers[action]) {
            sendError(`Action not found ${action}`, id, write);
            return;
        }

        const parsedArgs = tryFn(methodParsers[action].args.parser)(args);
        if (parsedArgs.error) {
            sendError(`Could not parse args`, id, write);
            return;
        }

        const result = tryFn(performAction)(action, parsedArgs.value, function (error: Error | undefined, response: any) {
            if (error) {
                sendError(error, id, write);
                return;
            }

            const toReturn = tryFn(methodParsers[action].returns.stringifier)(response);
            if (toReturn.error) {
                sendError(`Could not parse return value`, id, write);
                return;
            }

            const toSend = tryFn(ResponseSerializer.stringify)({
                error: undefined,
                value: toReturn.value.toString(),
                id,
            });

            if (toSend.error) {
                sendError(`Could not parse response`, id, write);
                return;
            }

            write(toSend.value);
        });

        if (result.error) {
            sendError(`Action failed`, id, write);
        }
    });
}

function errToString(err: any) {
    if (err && typeof err === 'object' && err instanceof Error) {
        err = {
            name: err.name,
            message: err.message,
            stack: err.stack
        };
    }
    return JSON.stringify(err);
}

let fn: any;
let obj = {
    error: null,
    value: null,
};

function tryFn<T, K extends any[]>(fn_: (...args: K) => T): (...args: K) => { error: any | null, value: T | undefined } {
    fn = fn_;
    return doFn;
}

function doFn() {
    try {
        obj.error = null;
        fn = null;
        obj.value = fn.apply(this, arguments);
        return obj;
    } catch (err) {
        obj.error = err;
        obj.value = null;
        return obj;
    }
}

function sendError(message: any, id: number, write: (chunk: Buffer | string) => void) {
    write(ResponseSerializer.stringify({
        id,
        error: errToString(message),
        value: null
    }));
}

function dictMethodParsers(prev: Record<string, MethodMetadata>, cur: MethodMetadata) {
    prev[cur.name] = cur
    return prev;
}


