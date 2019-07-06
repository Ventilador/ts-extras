import { resolve, dirname } from "path";
import { loaders } from "@ts-extras/types";
import { createLoader } from "./loader";
let doRegister = function register() {
    require('@ts-extras/register')(require('typescript'));
    doRegister = () => { };
}
export function getLoaders(packageJsonPath: string) {
    const pack: loaders.AugPackageJson = require(packageJsonPath);
    if (pack.tsLoaders) {
        const loaders = createLoaders(dirname(packageJsonPath), pack.tsLoaders);
        if (loaders.length) {
            return loaders;
        }
    }

    return [];
}

export function createLoaders(dirName: string, tsLoaders: loaders.PackageJsonConfigPath | loaders.PackageJsonConfigPath[]) {
    const loadersPaths = Array.isArray(tsLoaders) ? tsLoaders : [tsLoaders];
    return loadersPaths.map(createLoaderInternal, dirName).filter(isLoader);
}

function isLoader(val: any): val is loaders.Loader {
    return !!val;
}

export function createLoaderInternal(this/*dirName*/: string, config: loaders.PackageJsonConfigPath): loaders.Loader | undefined {
    doRegister();
    const options = requireLoader(resolve(this, config));
    if (options) {
        return createLoader(options.default);
    }

    return;
}

function requireLoader(path: string): loaders.LoaderFileExport | undefined {
    try {
        return require(path);
    } catch{ }
}