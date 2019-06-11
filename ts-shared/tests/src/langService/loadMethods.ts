import { join } from "path";
import { promisify } from "util";
import { readdir } from "fs";

const readDir = promisify(readdir);
const methodsFolder = join(__dirname, './methods');
export function loadMethods() {
    return readDir(methodsFolder).then(filterJsFiles);
}

function filterJsFiles(file: string[]) {
    return file.filter(isJsFile).map(toSerializersFolder)
}

function toSerializersFolder(file: string) {
    return join(methodsFolder, file);
}

function isJsFile(file: string) {
    return file.endsWith('.js');
}