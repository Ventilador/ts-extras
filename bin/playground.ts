import { promises, createWriteStream, watch, writeFileSync, readdirSync, readFileSync } from 'fs-extra';
import { join, dirname } from 'path';
import treeKill = require('tree-kill');
import { ChildProcess, spawn } from 'child_process';
const { readdir, writeFile, readFile } = promises;
readdirSync("plugin/src/methods")
    .forEach(file => {
        const content = readFileSync(join("plugin/src/methods", file), 'utf8');
        const lines = content.split(/\r\n/g)
            .map(i => {
                if (i.includes('if (handles(')) {
                    return 'debugger;' + i;
                }
                return i;
            })
            .join('\r\n');
        writeFile(join("plugin/src/methods", file), lines);
    })