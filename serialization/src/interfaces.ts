import { Reader } from './parser';
import { Metadata } from './decorators/metadata';
export type MethodDecoratorType = <T extends ProtoFunction>(target: T, propertyKey: string, descriptor: PropertyDescriptor) => PropertyDescriptor | void;
export type MoveDecoratorType = (target: ISerializer<any>) => any;
export type MoveMethodDecoratorType = (target: any, name: string) => any;
export type ClassWithMetatadata = ((new (...args: any[]) => ProtoClass) | Function) & { Metadata: Metadata };
export type ProtoClass = { constructor: ClassWithMetatadata };
export type ProtoFunction = { constructor: Function };



/**
 * allow nesting arrays up to three i think,
 * circular references are not allowed, 
 * 
 * for example:(add a "/" after the "*")
 * ```typescript
 *      export type MyType = string | number | MyType[]; // ts complains
 */
export type BaseSerializer = StringConstructor | NumberConstructor | BooleanConstructor | Object | ISerializer<any>;
export type BaseSerializerNest = BaseSerializer | [BaseSerializer];
// export type BaseSerializerNestNest = BaseSerializerNest | [BaseSerializerNest];
// export type BaseSerializerNestNestNest = BaseSerializerNestNest | [BaseSerializerNestNest];
// export type BaseSerializerNestNestNestNest = BaseSerializerNestNestNest | [BaseSerializerNestNestNest];




export type ReturnSerializer = BaseSerializerNest;
export type MoveSerializer = BaseSerializerNest;
export type ArgumentSerializer = BaseSerializerNest;
export type Parser<T> = (value: Reader) => T;
export type Stringifier<T> = (value: T) => string | Buffer;
export type ISerializer<T = any> = {
    parse: Parser<T>;
    stringify: Stringifier<T>;
} 
