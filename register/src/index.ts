// import { Module } from 'module';
import *as TsLib from 'typescript';
const Module = require('module').Module;
const compileModule = (Module as any).prototype._compile;

export =function (ts: typeof TsLib) {
    const jsCompiler = require.extensions['.js'];
    require.extensions['.ts'] = TsCompiler;
    function TsCompiler(module: NodeJS.Module, fileName: string) {
        (module as any)._compile = compile;
        return jsCompiler(module, fileName);
    }
    function compile(this: any, code: string, fileName: string) {
        return compileModule.call(this, ts.transpile(code, {
            target: ts.ScriptTarget.ES5
        }), fileName);
    }

}