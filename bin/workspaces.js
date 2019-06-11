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
        spawn(scripts[commandToRun], args, {
            cwd: join(process.cwd(), workspace),
            shell: true,
            stdio: 'ignore'
        }).on('exit', function (code, signal) {
            if (code) {
                reject(signal);
            } else {
                resolve();
            }
        })
    });
}