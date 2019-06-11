import { ClassWithMetatadata, Stringifier, Parser, ISerializer } from "../interfaces";
import { Reader } from "../parser";
const emptyReturns = {
    parser: () => [],
    stringifier: () => ''
}
export class Metadata {
    public static get(proto: ClassWithMetatadata) {
        if (proto.Metadata) {
            return proto.Metadata;
        }

        return proto.Metadata = new Metadata()
    }
    public readonly methods: readonly MethodMetadata[] = [];
    private _methods: Record<string, MethodMetadata> = Object.create(null);
    private constructor() { }

    // @internal
    public addMethodArg(name: string, args: IO) {
        this.ensureMethod(name).args = args;
    }

    // @internal
    public addMethodReturn(name: string, returns?: ISerializer<any>) {

        this.ensureMethod(name).returns = returns ? {
            parser: returns.parse,
            stringifier: returns.stringify
        } : emptyReturns;
    }

    // @internal
    public addMethodOriginalMethod(name: string, originalFunction: Function) {
        this.ensureMethod(name).originalFunction = originalFunction;
    }

    private ensureMethod(name: string) {
        if (!this._methods[name]) {
            this._methods[name] = { name } as any;
            (this as unknown as { methods: MethodMetadata[] }).methods.push(this._methods[name]);
        }
        return this._methods[name];
    }
}

export type IO = {
    stringifier: Stringifier<any[]>;
    parser: Parser<any[]>;
}
export type MethodMetadata = {
    name: string;
    originalFunction: Function;
    args: IO,
    returns: IO
}


function createParser(argumentSerialiserList: ISerializer<any>[]) {
    return function (reader: Reader) {
        return reader.collect(reader.collectNumber()).map(callparse, argumentSerialiserList);
    }
}

function callparse(this: ISerializer<any>[], val: any, index: number) {
    return this[index].parse(val);
}

function createStringifier(argumentSerialiserList: ISerializer<any>[]) {
    return function () {
        const arr = new Array(arguments.length);
        for (let i = 0; i < arr.length; i++) {
            arr[i] = argumentSerialiserList[i].stringify(arguments[i])
        }
        return `${arr.length}|${arr.join('')}`;
    }
}


