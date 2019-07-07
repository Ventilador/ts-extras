import { createLanguageService } from "./createLanguageService";
import { LanguageServerAsync } from "@ts-extras/shared";
import { readdir } from "fs";
import { promisify } from 'util';
import { join } from "path";
const dir = join(__dirname, 'methods');
export function init() {
    return Promise.all([
        promisify(readdir)(dir),
        createLanguageService(LanguageServerAsync.Metadata)
    ]).then(([files, lang]) => {
        files.map(i => join(dir, i)).map(require).map(i => i.default).forEach(fn => {
            fn(lang);
        });
    });
}