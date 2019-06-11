const argv = process.argv.slice(2);
const arg = argv.find(i => i.includes('dbg'));
if (arg) {
    const useTsNode = './node_modules/ts-node/register/index.js';
    const tsNodeArgs = argv.filter(i => !i.includes('dbg'));
    require('child_process').spawnSync('node', ['--inspect-brk', '-r', useTsNode, ...tsNodeArgs],
        {
            shell: true,
            stdio: 'inherit',
            cwd: process.cwd(),
        })
} else {
    require('ts-node').register({
        transpileOnly: true
    });
    require(process.cwd() + '/' + argv[0]);
}