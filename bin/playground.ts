import { promises, createWriteStream, watch, writeFileSync, readdirSync, readFileSync } from 'fs-extra';
import { join, dirname } from 'path';
import treeKill = require('tree-kill');
import { ChildProcess, spawn } from 'child_process';
const { readdir, writeFile, readFile } = promises;
readdirSync("plugin/src/methods")
    .forEach(file => {
        const content = readFileSync(join("plugin/src/methods", file), 'utf8');
        const lines = content.split(/\n/g)
            .filter(i => !i.includes('./../tsUtils'))
            .map(i => {
                if (i.includes('synchronize()')) {
                    return '';
                }

                return i;
            })
            .map(i => i.replace('calculatePosition({ from: fileName, to: toTsFile(fileName) }', 'movePosition(fileName, newFileName'))
            .map(i => i.replace('calculatePosition', 'movePosition'))
            .map(i => i.replace('isVueFile', 'handles'))
            .map(i => i.replace('toTsFile', 'toRedirected'))
            .join('\r\n');
        console.log(lines)
    })