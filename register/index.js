const compileModule = require('module').Module.prototype._compile;
module.exports = function (ts) {
    const jsCompiler = require.extensions['.js'];
    require.extensions['.ts'] = function (module, fileName) {
        module._compile = compile;
        return jsCompiler(module, fileName);
    }
    function compile(code, fileName) {
        return compileModule.call(this, ts.transpile(code, {
            target: 'es5'
        }), fileName);
    }
}