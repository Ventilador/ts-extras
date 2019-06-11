import { ProtoClass, ISerializer } from "../interfaces";
import { Metadata, IO } from "./metadata";
import { Reader } from "../parser";

export function decorateMethod<T extends ProtoClass>(proto: T, name: string, argumentSerialiserList: ISerializer<any>[]): any {
    Metadata.get(proto.constructor).addMethodArg(name, createSerializer(argumentSerialiserList));
}
const nullSerializer = { parser: () => [], stringifier: () => '' };
function createSerializer(argumentSerialiserList: ISerializer<any>[]): IO {
    if (!arguments.length) {
        return nullSerializer;
    }

    return {
        parser(str: Reader) {
            return str.collect(str.collectNumber())
                .map((value, i) => {
                    return argumentSerialiserList[i].parse(str.slice(value));
                });
        },
        stringifier(value: any[]) {
            const inString = value.map((value, index) => {
                return argumentSerialiserList[index].stringify(value);
            });
            const sizes = inString.map(i => i.length).join('|');
            return `${inString.length}|${sizes}|${inString.join('')}`;
        }
    }
}
