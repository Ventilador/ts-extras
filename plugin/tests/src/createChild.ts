import { fork, ChildProcess } from "child_process";
import { join } from "path";
import kill = require('tree-kill');
const tsserverPath = require.resolve('typescript/lib/tsserver');
const args = [
    "--useInferredProjectPerProjectRoot",
    "--enableTelemetry",
    // "--cancellationPipeName",
    // "C:\\Users\\VENTIL~1\\AppData\\Local\\Temp\\vscode-typescript\\tscancellation-3820dc67669a883a916c.tmp*",
    "--globalPlugins",
    "@ts-extras/plugin",
    // "--pluginProbeLocations",
    // "C:\\Users\\Ventilador\\.vscode-oss-dev\\extensions\\octref.vetur-0.19.3",
    "--locale", "en",
    "--noGetErrOnBackgroundUpdate",
    "--validateDefaultNpmLocation"
];

export function createServer() {
    if (!lastChild || lastChild.killed) {
        return createChild();
    }
    return new Promise<ChildProcess>(resolve => {
        lastChild!.on('exit', function () {
            createChild().then(resolve);
        });
        lastChild!.kill();
    });
}
let lastChild: ChildProcess | null = null;
function createChild() {
    return new Promise<ChildProcess>(resolve => {
        const child = fork(tsserverPath, args, {
            cwd: join(require.resolve('@ts-extras-tests/plugin'), '../../demo'),
            stdio: 'inherit',
            execArgv: ['--inspect-brk=9230']
        })
        child.kill = killSafe;
        child.stdout!.once('data', function () {
            child.stdin!.write(JSON.stringify({

            }));
            resolve(lastChild = child);
        });
    });
}


function killSafe(this: ChildProcess, signal?: string | number | undefined) {
    kill(this.pid, signal);
}
