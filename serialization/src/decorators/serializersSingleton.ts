import { ISerializer } from '../interfaces';
const cache = new Map<ISerializer<any>, string>();
export function getToken(serializer: ISerializer<any>): string {
  if (cache.has(serializer)) {
    return cache.get(serializer)!;
  }
  const token = nextToken();
  AllConstructors[token] = serializer;
  cache.set(serializer, token);
  return token;
}
// tslint:disable-next-line
export const AllConstructors = Object.create(null) as Record<string, ISerializer<any>>;
let i = 0;
function nextToken() {
  return '_' + i++;
}
