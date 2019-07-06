export const TCP_PORT = process.env.TS_SERVER_TCP_PORT ? +process.env.TS_SERVER_TCP_PORT : 61111;
export const seed = '__temp__';
export const TS_EXTENSION = `.${seed}.ts`;
export const JS_EXTENSION = `.${seed}.js`;
export const MAP_EXTENSION = `.${seed}.js.map`;
export const D_TS_EXTENSION = `.${seed}.d.ts`;
export const MAP_D_TS_EXTENSION = `.${seed}.d.ts.map`;
export function removeSeed(file: string) {
    return file.replace('.' + seed, '');
}
export function removeJsExt(file: string) {
    return file.replace(JS_EXTENSION, '');
}