import { normalizePath, readConfigFile, parseJsonConfigFileContent, BuildOptions, ParsedCommandLine, CompilerOptions, normalizeSlashes } from "typescript";
import { dirname, isAbsolute, join } from "path";
import { Stat } from "@ts-extras/mem-fs";
import { fs, loaders } from "@ts-extras/types";
import { createLoaders } from "@ts-extras/loaders";
import { mapRootFiles } from "./mapRootFiles";

export function loadTsConfig(fs: fs.MemoryFileSystem, path: string) {
    const newpath = resolveTsConfig(fs, path)!;
    if (newpath) {
        const { config, error } = readConfigFile(newpath, fs.readFile);
        if (error) {
            throw error;
        }

        if (config.tsLoaders) {
            const loaders = config.tsLoaders;
            delete config.tsLoaders;
            return {
                loaders: createLoaders(dirname(newpath), loaders),
                configFile: parseJsonConfig(
                    fs,
                    config,
                    newpath,
                )
            };
        }

        return {
            loaders: [],
            configFile: parseJsonConfig(
                fs,
                config,
                newpath,
            )
        };
    }

    throw new Error(`Not found config file for "${path}"`);

}

export function getBuildOptions(watch: boolean): BuildOptions {
    return {
        incremental: true,
        pretty: true,
        watch
    }
}

export function getAllConfigs(fs: fs.MemoryFileSystem, options: string, loaders: loaders.Loader[]): ParsedCommandLine[] {
    return collectAllConfigs(fs, options, loaders, []);
}

function parseJsonConfig(fs: fs.MemoryFileSystem, config: any, path: string, loaders?: loaders.Loader[]) {
    return Object.assign(parseJsonConfigFileContent(
        config,
        Object.assign({ useCaseSensitiveFileNames: true, }, fs),
        dirname(path),
    ), { configFilePath: normalizeSlashes(path) });;
}

function collectAllConfigs(fs: fs.MemoryFileSystem, tsConfigPath: string, loaders: loaders.Loader[], collected: ParsedCommandLine[]): ParsedCommandLine[] {
    const path = resolveTsConfig(fs, tsConfigPath);
    if (!path || collected.find(byFilePath, path.toLowerCase())) {
        return collected;
    }
    const tsConfig = readConfigFile(path, fs.readFile);
    const more = parseJsonConfig(fs, tsConfig.config, path, loaders);
    collected.push(more);

    if (more.projectReferences && more.projectReferences.length) {
        more.projectReferences.forEach(i => {
            collectAllConfigs(fs, i.path, loaders, collected);
        });
    }

    return collected;
}

function byFilePath(this/*tsConfigPath*/: string, cur: ParsedCommandLine) {
    return cur.configFilePath.toLowerCase() === this;
}
function resolveTsConfig(fs: fs.MemoryFileSystem, projectPathMaybe: string | undefined) {
    if (projectPathMaybe) {
        if (!isAbsolute(projectPathMaybe)) {
            projectPathMaybe = join(process.cwd(), projectPathMaybe);
        }

        try {
            return tryFindTsConfigFile(fs, projectPathMaybe);
        } catch{ }

    } else {
        return tryFind(fs, process.cwd(), 'tsconfig.json');
    }
}


function tryFindTsConfigFile(fs: fs.MemoryFileSystem, path: string): string | undefined {
    const info = tryDifferentLocationsFromPath(fs, path);
    if (info) {
        if (info.stat.isDirectory) {
            const fileMaybe = fs.readdir(info.path).sort(dirSorter)[0];
            if (fileMaybe && isTsConfigLikeFile(fileMaybe)) {
                return join(path, fileMaybe);
            }
        } else if (info.stat.isFile) {
            return info.path;
        }
    }
}


function tryFind(fs: fs.MemoryFileSystem, dir: string, fileName: string): string {
    if (!isFile(fs, join(dir, fileName))) {
        return tryFind(fs, dirname(dir), fileName);
    }

    return join(dir, fileName);
}

function tryDifferentLocationsFromPath(fs: fs.MemoryFileSystem, path: string): FoundResult | undefined {
    path = normalizePath(path);
    for (const tryOut of tryOuts) {
        const result = tryOut(fs, path);
        if (result) {
            return result;
        }
    }
}

type FoundResult = {
    path: string;
    stat: Stat;
};


function isFile(fs: fs.MemoryFileSystem, path: string) {
    try {
        return fs.stat(path).isFile;
    } catch (_err) {
        return false;
    }
}

function isTsConfigLikeFile(fileName: string) {
    return fileName.startsWith('tsconfig') && fileName.endsWith('.json');
}

function tryPath(fs: fs.MemoryFileSystem, path: string) {
    try {
        return {
            path, stat: fs.stat(path)
        }
    } catch{ }
}



function dirSorter(a: string, b: string) {
    return fileToNumHeuristic(b) - fileToNumHeuristic(a);
}

function fileToNumHeuristic(fileName: string) {
    if (isTsConfigFile(fileName)) {
        return 100;
    }
    if (isTsConfigLikeFile(fileName)) {
        return 1;
    }

    return 0
}


function isTsConfigFile(fileName: string) {
    return fileName === 'tsconfig.json';
}


const tryOuts = [
    (fs: fs.MemoryFileSystem, path: string) => path.endsWith('.json') ? tryPath(fs, path) : undefined,
    (fs: fs.MemoryFileSystem, path: string) => tryPath(fs, path),
    (fs: fs.MemoryFileSystem, path: string) => tryPath(fs, path + '.json'),
];