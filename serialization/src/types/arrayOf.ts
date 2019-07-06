import { Reader } from '../parser';
import { ISerializer } from '../interfaces';
import { optionalWrap } from '../decorators/moveImpl';
const cached = Symbol('cached');

export function ArrayOf<T>(serializer: ISerializer<T>, optional = false): ISerializer<T[]> {
  if (optional) {
    serializer = optionalWrap(serializer);
  }
  if ((serializer as any)[cached]) {
    return (serializer as any)[cached];
  }
  return ((serializer as any)[cached] = {
    parse: (reader: Reader) => {
      const length = reader.collectNumber(); // get length of array
      return reader
        .collect(length) // get all the sized of the items
        .map(reader.slice, reader) // slice the items into readers
        .map(serializer.parse, serializer); // call parse on each reader with the appropiate serializer
    },
    stringify: (val: T[]) => {
      const preparedValues = val.map(serializer.stringify);
      return `${
        val.length // set first length of array
        }|${
        // and then a pipe
        preparedValues.map(toLength).join('|') // set sizes of each item separated by a pipe
        /**
         * since all sizes are known, there is no need to the last pipe
         * (join only adds pipes between items not first nor last)
         * there is no need for separators between values either
         */
        }|${preparedValues.join('')}`;
    }
  });
}

function toLength(val: string) {
  return val.length;
}
