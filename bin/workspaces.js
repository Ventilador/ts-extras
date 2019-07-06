const spawn = require('child_process').spawn;
const join = require('path').join;
const packageJson = require('../package.json');
const workspaces = packageJson.workspaces;
const scripts = packageJson.scripts;
const args = process.argv.slice(2);
const commandToRun = args.shift();
Promise.all(workspaces.map(runCommand).concat([runCommand('')]));
function runCommand(workspace) {
    return new Promise(function (resolve, reject) {
        const errs = [];
        spawn(scripts[commandToRun], args, {
            cwd: join(process.cwd(), workspace),
            shell: true,
            stdio: 'pipe'
        }).on('exit', function (code, signal) {
            if (code) {
                error(`Something went wrong whe running "${workspace}" and did not complete successfully, see error below`);

                error(errs.join(''));
                resolve(signal);
            } else {
                resolve();
            }
        }).on('error', function (err) {
            if (err.errno === 'ENOENT') {
                error(
                    `Either the workspace "${workspace}" does not exists`,
                    'Or the command being executed does not exists');
                tip(
                    'This error occurs when the it failed to spawn the process',
                    'not that the process itself outputted over stderr');
            } else {
                error(`Something went wrong when trying to spawn the process for "${workspace}", see error below`);

                console.error(err);
            }
            resolve(err);
        }).stderr.on('data', function (chunk) {
            errs.push(chunk);
        });
    });
}

function error(...args) {
    console.error('\x1b[43m\x1b[31mERROR:\x1b[0m\x1b[0m');
    console.error('\x1b[47m\x1b[31m%s\x1b[0m\x1b[0m', args.join('\r\n'));
}

function tip(...args) {
    console.log('\x1b[45m%s\x1b[0m', args.join('\r\n'));
}
