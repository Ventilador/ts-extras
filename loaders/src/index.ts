import { resolve, dirname } from "path";
import { loaders } from "@ts-extras/types";
import { createServerLoader } from "./serverLoader";
import { createCompilerLoader } from "./compilerLoader";
export { createCompilerLoader } from "./compilerLoader";
export { createServerLoader } from "./serverLoader";
export { createBaseLoader } from './baseLoader';
let doRegister = function register() {
    require('@ts-extras/register')(require('typescript'));
    doRegister = () => { };
}

export function getCompilerLoaders(packageJsonPath: string) {
    const pack: loaders.AugPackageJson = require(packageJsonPath);
    if (pack.tsLoaders) {
        const loaders = createCompilerLoaders(dirname(packageJsonPath), pack.tsLoaders);
        if (loaders.length) {
            return loaders;
        }
    }

    return [];
}

export function createCompilerLoaders(dirName: string, tsLoaders: loaders.PackageJsonConfigPath | loaders.PackageJsonConfigPath[]) {
    const loadersPaths = Array.isArray(tsLoaders) ? tsLoaders : [tsLoaders];
    return loadersPaths.map(createCompilerLoaderInternal, dirName).filter(isLoader);
}


export function getServerLoaders(packageJsonPath: string) {
    const pack: loaders.AugPackageJson = require(packageJsonPath);
    if (pack.tsLoaders) {
        const loaders = createServerLoaders(dirname(packageJsonPath), pack.tsLoaders);
        if (loaders.length) {
            return loaders;
        }
    }

    return [];
}

export function createServerLoaders(dirName: string, tsLoaders: loaders.PackageJsonConfigPath | loaders.PackageJsonConfigPath[]) {
    const loadersPaths = Array.isArray(tsLoaders) ? tsLoaders : [tsLoaders];
    return loadersPaths.map(createLoaderInternal, dirName).filter(isLoader);
}

function isLoader<T extends loaders.BaseLoader>(val: T | undefined): val is T {
    return !!val;
}

function createLoaderInternal(this/*dirName*/: string, config: loaders.PackageJsonConfigPath): loaders.ServerLoader | undefined {
    doRegister();
    const options = requireLoader(resolve(this, config));
    if (options) {
        return createServerLoader(options.default);
    }

    return;
}


function createCompilerLoaderInternal(this/*dirName*/: string, config: loaders.PackageJsonConfigPath): loaders.CompilerLoader | undefined {
    doRegister();
    const options = requireLoader(resolve(this, config));
    if (options) {
        return createCompilerLoader(options.default);
    }

    return;
}

function requireLoader(path: string): loaders.LoaderFileExport | undefined {
    try {
        return require(path);
    } catch{ }
}