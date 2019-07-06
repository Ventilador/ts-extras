import { promises, createWriteStream, watch } from 'fs-extra';
import { join, dirname } from 'path';
import treeKill = require('tree-kill');
import { ChildProcess, spawn } from 'child_process';
const { readdir, writeFile, readFile } = promises;
const packageJson = require('../package.json');
const workspaces = packageJson.workspaces;

Promise.all(workspaces.map(w => {
    const found: Record<string, boolean> = {};
    return readDir(join(process.cwd(), w), found)
        .then(() => console.log(w, found));
}));

function readDir(path: string, found: Record<string, boolean>) {
    return readdir(path)
        .catch(err => tryFile(path, found))
        .then(i => i.map(j => join(path, j)).filter(i => !i.includes('node_modules')))
        .then(i => {
            return Promise.all(i.map(path => readDir(path, found)));
        })
}

function tryFile(path: string, found: Record<string, boolean>) {
    if (path.endsWith('.ts')) {
        return readFile(path, 'utf-8').then(content => {
            let index = 0;
            while (true) {
                index = content.indexOf('@ts-extras/', index);
                if (index === -1) {
                    return;
                }

                const utilsName = /@ts-extras\/([^'"]+)['"].*/.exec(content.slice(index));
                if (utilsName) {
                    found[utilsName[1]] = true;
                }
                index++;
            }
        }).then(returnEmptyArray, returnEmptyArray)
    }
    return returnEmptyArray();
}

function returnEmptyArray() {
    return [] as string[];
}
