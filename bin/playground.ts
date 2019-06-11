import { promises, createWriteStream } from 'fs-extra';
import { join } from 'path';
const { readdir, writeFile } = promises;
const lang = require('E:/Projects/ts-server-tcp/ts-shared/dist/languageServerAsync.js').LanguageServerAsync;
lang.Metadata.methods.forEach(({ name }) => {
    writeFile(join('E:/Projects/ts-server-tcp/ts-shared/tests/src/langService/methods', name + '.ts'), `import { LanguageServerAsync } from "@ts-utils/shared";
import { createArgLangServiceTester } from "../createArgLangServiceTester";

fdescribe('${name} method', () => {
    let lang: LanguageServerAsync;
    beforeEach(function () {
        lang = createArgLangServiceTester(LanguageServerAsync.Metadata);
    });

    xit('should support being called', function () {
        // lang.${name}
    });
});`)
})