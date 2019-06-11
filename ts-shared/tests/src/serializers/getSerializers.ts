import { dirname, join } from "path";
import { promisify } from "util";
import { readdir } from "fs";

const readDir = promisify(readdir);
const serializersFolder = dirname(require.resolve('@ts-utils/shared/dist/serialization'));

export function getSerializerFiles() {
    return readDir(serializersFolder).then(filterJsFiles);
}

function filterJsFiles(file: string[]) {
    return file.filter(isJsFile).map(toSerializersFolder)
}

function toSerializersFolder(file: string) {
    return join(serializersFolder, file);
}

function isJsFile(file: string) {
    return file.endsWith('.js');
}