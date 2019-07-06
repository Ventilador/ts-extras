import { readConfigFile } from "typescript";
import { readFileSync } from "fs";

export function readJsonFile(path: string) {
    const result = readConfigFile(path, readFile);
    if (result.error) {
        return null;
    }
    return result.config;
}
function readFile(path: string) {
    try {
        return readFileSync(path, 'utf8');
    } catch{ }
}