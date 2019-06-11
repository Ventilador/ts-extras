import Jasmine = require('jasmine');
import { join } from 'path';
import { existsSync } from 'fs';
import yargs = require('yargs');
const argv = yargs.option('series', {
    alias: 's',
    description: 'Run tests in series (defaults parallel)',
    type: 'boolean',
}).argv;
const rootPath = process.cwd();
const packajeJson = require('./../package.json');
const workspaces: string[] = packajeJson.workspaces;

const jasmineInstances = workspaces
    .map(i => join(rootPath, i, 'tests/dist/index.js'))
    .filter(existsSync)
    .map(require)
    .map(callInit);
if (argv.series) {
    jasmineInstances.reduce((prev, cur) => {
        return prev.then(() => {
            return cur.then(runInstance);
        });
    }, Promise.resolve())
} else {
    Promise.all(jasmineInstances).then(instances => {
        return Promise.all(instances.map(runInstance));
    });
}
function callInit(val: { init: () => Promise<Jasmine> | Jasmine }) {
    return Promise.resolve(val.init());
}
function runInstance(instance: Jasmine) {
    return new Promise<any>((r) => {
        instance.onComplete(r);
        instance.execute();
    });
}
