import { Serializer } from '../decorators/serializer';
import { Move, Enum } from '../decorators';
import { Thru } from './thru';
import { F64 } from './f64';
import { ISerializer } from '../interfaces';
import { Reader } from '../parser';


const RequestArgs = { parse, stringify } as ISerializer<any>;
const ResponseArg = { parse, stringify } as ISerializer<any>;
function stringify(val: any) {
  return val;
}
function parse(val: any) {
  return val;
}

export interface Message {
  id: number;
}

export interface ResponseMessage<T = any> extends Message {
  error: Error | undefined;
  value: T;
}

export interface RequestMessage extends Message {
  action: string;
  args: any[];
}

export interface IResponseMessage extends Message {
  error: string;
  value: string;
}


export interface IRequestMessage extends Message {
  action: string;
  args: string;
}

export const RequestSerializer = {
  parse: (chunk: Buffer) => {
    const reader = new Reader(chunk);
    return {
      id: reader.collectNumber(),
      action: reader.slice(reader.collectNumber()).toString(),
      args: reader
    };
  },
  stringify: ({ id, action, args }: IRequestMessage) => {
    return `${id}|${action.length}|${action}${args}`;
  }
}

export const ResponseSerializer = {
  parse: (chunk: Buffer) => {
    const reader = new Reader(chunk);
    if (reader.collectNumber() !== 0) {
      return {
        id: reader.collectNumber(),
        error: null,
        value: reader.slice(reader.collectNumber())
      };
    }

    return {
      id: reader.collectNumber(),
      error: JSON.parse(reader.slice(reader.collectNumber()).toString()),
      value: null
    };
  },
  stringify: ({ id, value, error }: IResponseMessage) => {
    if (error) {
      return `0|${id}|${(error as string).length}|${error}`
    } else {
      return `1|${id}|${(value as string).length}|${value}`;
    }
  }
};
