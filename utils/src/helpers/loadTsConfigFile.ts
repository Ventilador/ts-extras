import { readConfigFile, parseJsonConfigFileContent, sys } from "typescript";
import { readFileSync } from "fs";
import { dirname, isAbsolute } from "path";
function readFile(path: string) {
    return readFileSync(path, 'utf8');
}
export function assertPathIsAbsolute(path: string) {
    if (!isAbsolute(path)) {
        throw new Error(`Expected "${path}" to be absolute`);
    }
}
export function loadTsConfig(path: string) {
    assertPathIsAbsolute(path);
    const { config, error } = readConfigFile(path, readFile);
    if (error) {
        throw error;
    }

    return parseJsonConfigFileContent(config, sys, dirname(path))
}