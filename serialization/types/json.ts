import { Reader } from '../parser';
// tslint:disable-next-line
export const FullJson = {
  parse: (reader: Reader) => JSON.parse(reader.toString()),
  stringify: (value: any) => JSON.stringify(value)
};
