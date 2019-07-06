import { CompilerHost, normalizePath, SourceFile, CompilerOptions, BuilderProgram, Diagnostic, ProjectReference, createSemanticDiagnosticsBuilderProgram, CancellationToken, CustomTransformers, EmitResult, Extension } from "typescript";
import { loaders, fs, Extensions } from "@ts-extras/types";
import { join, dirname, basename } from "path";

export function createWrappedProgram(loaders: loaders.Loader[], rootNames: readonly string[] | undefined, options: CompilerOptions | undefined, host?: CompilerHost | undefined, oldProgram?: BuilderProgram | undefined, configFileParsingDiagnostics?: readonly Diagnostic[] | undefined, projectReferences?: readonly ProjectReference[] | undefined): BuilderProgram {
    const program = createSemanticDiagnosticsBuilderProgram(rootNames, options, host, oldProgram as any, configFileParsingDiagnostics, projectReferences);
    return Object.assign({}, program, { emit });
    function emit(targetSourceFile?: SourceFile | undefined, _origWriteFile?: loaders.WriteFileCallback | undefined, cancellationToken?: CancellationToken | undefined, emitOnlyDtsFiles?: boolean | undefined, customTransformers?: CustomTransformers | undefined): EmitResult {
        const { flush, writeFile } = createWriteFileFromLoaders(loaders, host!.writeFile as any, options!);
        const result = program.emit(targetSourceFile, writeFile, cancellationToken, emitOnlyDtsFiles);
        flush();
        return result;
    }
}
function createWriteFileFromLoaders(loaders: loaders.Loader[], writeFile: loaders.WriteFileCallback = noop, options: CompilerOptions) {
    if (loaders.length) {
        return createWriteFileWithLoaders(loaders, writeFile, options);
    } else {
        return { writeFile, flush: noop };
    }
}

function createWriteFileWithLoaders(loaders: loaders.Loader[], writeFileToDisk: loaders.WriteFileCallback = noop, options: CompilerOptions) {
    let cache = new Map<string, CacheItem>();
    return {
        writeFile, flush
    }
    function writeFile(fileName: string, content: string) {
        for (const loader of loaders) {
            let originatingFileName: string | false;
            if (originatingFileName = loader.getJsOutputFileName(fileName)) {
                add(loader, originatingFileName, fileName, content, Extensions.JsFile);

            } else if (originatingFileName = loader.getDefinitionOutputFileName(fileName)) {
                add(loader, originatingFileName, fileName, content, Extensions.DTsFile);

            } else if (originatingFileName = loader.getSourceMapFileName(fileName)) {
                add(loader, originatingFileName, fileName, content, Extensions.MapFile);

            } else if (originatingFileName = loader.getDTsSourceMapFileName(fileName)) {
                add(loader, originatingFileName, fileName, content, Extensions.DTsMapFile);

            }
        }
        writeFileToDisk(fileName, content);
    }
    function flush() {
        cache.forEach(function (val, key) {
            const dtsFile = val[Extensions.DTsFile];
            const jsFile = val[Extensions.JsFile];
            const mapFile = val[Extensions.MapFile];
            const dtsMapFile = val[Extensions.DTsMapFile];
            const loader = assertAllLoadersAreTheSame(dtsFile, jsFile, mapFile, dtsMapFile);
            loader.emit(redirectFileToSource(key, options), createEmitResult({ dtsFile, jsFile, mapFile, dtsMapFile }, dirname(key), basename(key)), writeFileToDisk)
        });
        cache = new Map<string, CacheItem>();
    }
    function add(loader: loaders.Loader, fileName: string, toWrite: string, content: string, ext: Extensions) {
        if (cache.has(fileName)) {
            cache.get(fileName)![ext] = { toWrite, content, loader };
        } else {
            cache.set(fileName, {
                [ext]: { toWrite, content, loader }
            });
        }
    }
}
type IFiles = {
    dtsFile: Item;
    jsFile: Item;
    mapFile: Item;
    dtsMapFile: Item;
}
function createEmitResult(files: IFiles, outDir: string, fileName: string): Pick<loaders.EmitResult, "getDTs" | "getJs" | "getMap" | "getDTsMap" | "fileName" | "outDir"> {
    return {
        getDTs: getFileBy(files, Extensions.DTsFile),
        getJs: getFileBy(files, Extensions.JsFile),
        getDTsMap: getFileBy(files, Extensions.DTsMapFile),
        getMap: getFileBy(files, Extensions.MapFile),
        outDir,
        fileName,
    }
}
function getFileBy(files: IFiles, ext: Extensions) {
    let file: Item;
    switch (ext) {
        case Extensions.DTsFile:
            file = files.dtsFile
            break;
        case Extensions.JsFile:
            file = files.jsFile;
            break;
        case Extensions.MapFile:
            file = files.mapFile;
            break;
        case Extensions.DTsMapFile:
            file = files.dtsMapFile;
            break;
        default:
            throw new Error(`Invalid extension`)
    }
    const content = file.content;
    return function () {
        return content;
    }
}

function assertAllLoadersAreTheSame(a: Item, b: Item, c: Item, d: Item) {
    if (a.loader === b.loader &&
        a.loader === c.loader &&
        a.loader === d.loader &&
        b.loader === c.loader &&
        b.loader === d.loader &&
        c.loader === d.loader) {
        return a.loader;
    }
    throw new Error('Loaders mismatch');
}
type CacheItem = {
    [key: number]: Item;
}
type Item = {
    toWrite: string;
    content: string;
    loader: loaders.Loader;
}

function redirectFileToSource(file: string, options: CompilerOptions) {
    const from = options.rootDir || dirname((options as any).configFilePath);
    if (from) {
        const to = options.outDir;
        if (to) {
            return normalizePath(join(from, file.slice(to.length)));
        }
    }
    throw new Error('Cannot redirect');
}

function noop() { }
