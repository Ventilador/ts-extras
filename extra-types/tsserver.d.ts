import { sys } from 'typescript/lib/tsserverlibrary';
declare module 'typescript/lib/tsserverlibrary' {
    export function normalizeSlashes(path: string): string;

}