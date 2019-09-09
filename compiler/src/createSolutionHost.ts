import {
    SolutionBuilderHost, SolutionBuilderWithWatchHost, BuilderProgram,
    getDefaultLibFileName, resolveModuleName,
    ResolvedTypeReferenceDirective, Diagnostic,
    formatDiagnosticsWithColorAndContext, sys,
    CompilerOptions,
    ResolvedProjectReference, resolveTypeReferenceDirective, FileWatcherCallback, FileWatcherEventKind, DirectoryWatcherCallback, ProjectReference, CompilerHost, ParsedCommandLine, normalizeSlashes,
} from "typescript";
import { createCompilerLoaders, getCompilerLoaders } from '@ts-extras/loaders';
import { Stat } from "@ts-extras/mem-fs";
import { dirname, resolve, join } from "path";
import { loadTsConfig, getAllConfigs } from "./utils";
import { mapRootFiles } from "./mapRootFiles";
import { fs } from "@ts-extras/types";
import { createWrappedProgram } from "./createProgram";
import { mapExtensions } from "./mapExtensions";
const diagHost = {
    getNewLine: () => sys.newLine,
    getCurrentDirectory: () => sys.getCurrentDirectory(),
    getCanonicalFileName: (file: string) => file
}
export type SolutionBuilder = (SolutionBuilderHost<BuilderProgram> | SolutionBuilderWithWatchHost<BuilderProgram>);
const dir = process.cwd();
const libLocation = dirname(resolve(sys.getExecutingFilePath()));
export function createHost(path: string, fs: fs.MemoryFileSystem): SolutionBuilder {
    cleanScreen();
    const { configFile, loaders: loadersPath } = loadTsConfig(fs, path);

    const tsConfigLoaders = createCompilerLoaders(dirname(path), loadersPath);
    const configsByFile = new Map<string, ParsedCommandLine>();
    const packageJsonLoaders = getCompilerLoaders(join(dirname(path), 'package.json'));
    const loaders = tsConfigLoaders.concat(packageJsonLoaders);
    const compilerHost: SolutionBuilder = {
        deleteFile: fs.deleteFile,
        directoryExists: fs.directoryExists,
        fileExists: fs.fileExists,
        realpath: fs.realpath,
        createHash: sys.createHash,
        getDefaultLibFileName: getLibName,
        setModifiedTime: () => {
            // TODO support utime
        },
        trace: console.trace,
        resolveModuleNames: resolveModuleNames,
        readDirectory: readDirectory,
        watchFile,
        watchDirectory,
        readFile,
        createProgram,
        clearTimeout,
        getCurrentDirectory,
        getDefaultLibLocation,
        getDirectories,
        getEnvironmentVariable,
        getModifiedTime,
        getNewLine,
        now,
        onWatchStatusChange: onWatchStatusChange,
        reportDiagnostic,
        reportSolutionBuilderStatus,
        resolveTypeReferenceDirectives,
        useCaseSensitiveFileNames,
        setTimeout,
        writeFile: fs.writeFile,
    };
    getAllConfigs(Object.assign({}, fs, compilerHost), path, loaders).forEach(c => {
        c.fileNames.forEach(f => configsByFile.set(normalizeSlashes(f.toLowerCase()), c));
    });
    return compilerHost;


    function readDirectory(path: string, extensions?: ReadonlyArray<string>, exclude?: ReadonlyArray<string>, include?: ReadonlyArray<string>, depth?: number): string[] {
        return mapRootFiles(fs.readDirectory(path, mapExtensions(loaders, extensions), exclude, include, depth), loaders, fs.writeVirtualFile)!;
    }
    function createProgram(rootNames: readonly string[] | undefined, options: CompilerOptions | undefined, host?: CompilerHost | undefined, oldProgram?: BuilderProgram | undefined, configFileParsingDiagnostics?: readonly Diagnostic[] | undefined, projectReferences?: readonly ProjectReference[] | undefined): BuilderProgram {
        return createWrappedProgram(loaders, rootNames, options, host, oldProgram as any, configFileParsingDiagnostics, projectReferences);
    }
    function watchFile(path: string, callback: FileWatcherCallback) {
        return {
            close: fs.watchFile(path, function (name: string, stats: Stat) {
                cleanScreen();
                callback(path, FileWatcherEventKind.Changed);
            })
        }
    }
    function watchDirectory(path: string, callback: DirectoryWatcherCallback) {
        return {
            close: fs.watchFile(path, function () {
                cleanScreen();
                callback(path)
            })
        };
    }
    function readFile(path: string) {
        try {
            return fs.readFile(path);
        } catch{ }
    }

    function getDirectories(path: string) {
        return fs.readdir(path)
            .filter(item => fs.directoryExists(join(path, item)));
    }
    function getEnvironmentVariable(varName: string) { return process.env[varName]; }
    function getModifiedTime(path: string) {
        try {
            return new Date(fs.stat(path).mtime);
        } catch{ }
    }
    function getNewLine() { return sys.newLine; }
    function now() { return new Date(); }
    function onWatchStatusChange(diagnostic: Diagnostic) {
        reportDiagnostic(diagnostic);
    }

    function reportDiagnostic(diagnostic: Diagnostic | Diagnostic[]) {
        diagnostic = Array.isArray(diagnostic) ? diagnostic : [diagnostic];
        if (diagnostic.length) {
            writeScreen(formatDiagnosticsWithColorAndContext(diagnostic, diagHost));
        }

    }

    function reportSolutionBuilderStatus(diagnostic: Diagnostic) {
        reportDiagnostic(diagnostic);
    }
    function resolveModuleNames(moduleNames: string[], containingFile: string, _reusedNames?: string[], redirectedReference?: ResolvedProjectReference) {
        const options = findByFolder(containingFile);
        return moduleNames.map((moduleName) => {
            return resolveModuleName(moduleName, containingFile, options, compilerHost, undefined, redirectedReference).resolvedModule!;
        });
    }
    function resolveTypeReferenceDirectives(typeReferenceDirectiveNames: string[], containingFile: string): ResolvedTypeReferenceDirective[] {
        const options = findByFolder(containingFile);
        return typeReferenceDirectiveNames.map((i) => {
            return resolveTypeReferenceDirective(i, containingFile, options, fs).resolvedTypeReferenceDirective!;
        });
    }
    function findByFolder(path: string) {
        let newPath = normalizeSlashes(path.toLowerCase());
        if (configsByFile.has(newPath)) {
            return configsByFile.get(newPath)!.options;
        }

        if (newPath.includes('infer')) {
            newPath = dirname(newPath);
            configsByFile.forEach((value, key) => {
                if (key.startsWith(newPath)) {
                    newPath = key;
                    configsByFile.set(newPath, value);
                }
            });
        }

        return (configsByFile.get(newPath) || configFile).options!;
    }
}
function useCaseSensitiveFileNames() { return true; }
let something = true;
function cleanScreen() {
    if (something) {
        something = false;
        process.stdout.write('\u001b[2J\u001b[0;0H');
    }
}
function writeScreen(message: string) {
    something = true;
    process.stdout.write(message);
}
function noop() { }

function getDefaultLibLocation(): string {
    return libLocation;
}

function getLibName(options: CompilerOptions): string {
    return join(libLocation, getDefaultLibFileName(options));
}
function getCurrentDirectory() { return dir; }
