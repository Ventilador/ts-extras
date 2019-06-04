import { Serializer } from '../decorators/serializer';
import { Move } from '../decorators/move';
import { Thru, FromEnum } from './thru';
import { ArrayOf } from './arrayOf';
import { F64 } from './f64';
import { ISerializer } from './types';
import { Reader } from '../parser';
export enum MessageType {
  Request = 0,
  Response = 1,
  Error = 2
}

const readerSerializer = {
  parse: (val: any) => (val ? (typeof val === 'string' ? new Reader(val) : val) : Reader.Empty),
  stringify: (val: string) => val
} as ISerializer<any>;

@Move()
export class SocketMessage extends Serializer {
  @Move(FromEnum(MessageType)) type: MessageType;
  @Move(Thru) action: string;
  @Move(ArrayOf(readerSerializer)) args: string[];
  @Move(F64) id: number;
}
