#!/usr/bin/env node
require('@ts-extras/compiler').default(process.cwd() + '/tsconfig.json', !!process.argv.find(watchArgument));
function watchArgument(value) {
    return value === '-w' || value === '--watch';
}