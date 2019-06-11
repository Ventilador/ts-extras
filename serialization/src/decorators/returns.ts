import { Metadata } from "./metadata";
import { ISerializer, ProtoClass } from "../interfaces";

export function decorateReturn<T extends ProtoClass>(proto: T, name: string, serializer?: ISerializer<any>): any {
    Metadata.get(proto.constructor).addMethodReturn(name, serializer);
}