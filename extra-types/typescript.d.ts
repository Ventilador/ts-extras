import { sys } from 'typescript';
declare module 'typescript' {
    export function createSolutionBuilder<T extends BuilderProgram>(
        host: SolutionBuilderHost<T> | SolutionBuilderWithWatchHost<T>,
        rootNames: ReadonlyArray<string>,
        defaultOptions: BuildOptions
    ): SolutionBuilderWithWatch;
    export interface ModuleResolutionCache extends NonRelativeModuleNameResolutionCache {
        getOrCreateCacheForDirectory(directoryName: string, redirectedReference?: ResolvedProjectReference): Map<ResolvedModuleWithFailedLookupLocations>;
        directoryToModuleNameMap: CacheWithRedirects<Map<ResolvedModuleWithFailedLookupLocations>>;
    }
    export function normalizeSlashes(path: string): string;
    export function toPath(fileName: string, basePath: string | undefined, getCanonicalFileName: (path: string) => string): Path;
    export interface CacheWithRedirects<T> {
        ownMap: Map<T>;
        redirectsMap: Map<Map<T>>;
        getOrCreateMapOfCacheRedirects(redirectedReference: ResolvedProjectReference | undefined): Map<T>;
        clear(): void;
        setOwnOptions(newOptions: CompilerOptions): void;
        setOwnMap(newOwnMap: Map<T>): void;
    }
    export interface ParsedCommandLine {
        configFilePath: string;
    }
    export function normalizePath(path: string): string;
    export interface NonRelativeModuleNameResolutionCache {
        getOrCreateCacheForModuleName(nonRelativeModuleName: string, redirectedReference?: ResolvedProjectReference): PerModuleNameCache;
        moduleNameToDirectoryMap: CacheWithRedirects<PerModuleNameCache>;
    }
    export function loadWithLocalCache<T>(names: string[], containingFile: string, redirectedReference: ResolvedProjectReference | undefined, loader: (name: string, containingFile: string, redirectedReference: ResolvedProjectReference | undefined) => T): T[];
    export type ReportEmitErrorSummary = (errorCount: number) => void;
    export type Sys = {
        useCaseSensitiveFileNames: boolean;
        newLine: string;
        getExecutingFilePath(): string;
        getCurrentDirectory(): string;
        fileExists(path: string): boolean;
        readFile(path: string, encoding?: string | undefined): string | undefined;
        directoryExists(path: string): boolean;
        getDirectories(path: string): string[];
        readDirectory(
            path: string,
            extensions?: readonly string[] | undefined,
            exclude?: readonly string[] | undefined,
            include?: readonly string[] | undefined,
            depth?: number | undefined): string[];
        realpath?(path: string): string;
        getEnvironmentVariable(name: string): string;
        write(s: string): void;
        createDirectory(path: string): void;
        writeFile(path: string, data: string, writeByteOrderMark?: boolean | undefined): void;
        createHash?(data: string): string;
    }
    export interface SolutionBuilderWithWatch extends SolutionBuilder {
        /*@internal*/ startWatching(): void;
    }
    export interface SolutionBuilderWithWatchHost<T extends BuilderProgram> extends SolutionBuilderHostBase<T>, WatchHost {
    }
    export interface SolutionBuilderHost<T extends BuilderProgram> extends SolutionBuilderHostBase<T> {
        reportErrorSummary?: ReportEmitErrorSummary;
    }
    export interface SolutionBuilderHostBase<T extends BuilderProgram> extends ProgramHost<T> {
        getModifiedTime(fileName: string): Date | undefined;
        setModifiedTime(fileName: string, date: Date): void;
        deleteFile(fileName: string): void;
        writeFile(file: string, content: string): any;
        reportDiagnostic: DiagnosticReporter; // Technically we want to move it out and allow steps of actions on Solution, but for now just merge stuff in build host here
        reportSolutionBuilderStatus: DiagnosticReporter;

        // TODO: To do better with watch mode and normal build mode api that creates program and emits files
        // This currently helps enable --diagnostics and --extendedDiagnostics
        afterProgramEmitAndDiagnostics?(program: T): void;

        // For testing
        now?(): Date;
    }
    export interface SolutionBuilder {
        buildAllProjects(): ExitStatus;
        cleanAllProjects(): ExitStatus;

        // TODO:: All the below ones should technically only be in watch mode. but thats for later time
        /*@internal*/ resolveProjectName(name: string): ResolvedConfigFileName;
        /*@internal*/ getUpToDateStatusOfFile(configFileName: ResolvedConfigFileName): UpToDateStatus;
        /*@internal*/ getBuildGraph(configFileNames: ReadonlyArray<string>): DependencyGraph;

        /*@internal*/ invalidateProject(configFileName: string, reloadLevel?: ConfigFileProgramReloadLevel): void;
        /*@internal*/ buildInvalidatedProject(): void;

        /*@internal*/ resetBuildContext(opts?: BuildOptions): void;
    }
    interface DependencyGraph {
        buildQueue: ResolvedConfigFileName[];
        /** value in config File map is true if project is referenced using prepend */
        referencingProjectsMap: ConfigFileMap<ConfigFileMap<boolean>>;
    }
    type ConfigFileMap<T> = FileMap<T, ResolvedConfigFileName, ResolvedConfigFilePath>;
    interface FileMap<T, U extends string = string, V extends Path = Path> {
        setValue(fileName: U, value: T): void;
        getValue(fileName: U): T | undefined;
        hasKey(fileName: U): boolean;
        removeKey(fileName: U): void;
        forEach(action: (value: T, key: V) => void): void;
        getSize(): number;
        clear(): void;
    }
    type ResolvedConfigFilePath = ResolvedConfigFileName & Path;
    export interface BuildOptions extends OptionsBase {
        dry?: boolean;
        force?: boolean;
        verbose?: boolean;

        /*@internal*/ clean?: boolean;
        /*@internal*/ watch?: boolean;
        /*@internal*/ help?: boolean;

        preserveWatchOutput?: boolean;
        listEmittedFiles?: boolean;
        listFiles?: boolean;
        pretty?: boolean;
        incremental?: boolean;

        traceResolution?: boolean;
        /* @internal */ diagnostics?: boolean;
        /* @internal */ extendedDiagnostics?: boolean;
    }
    export interface OptionsBase {
        [option: string]: CompilerOptionsValue | undefined;
    }

    export type UpToDateStatus =
        | Status.Unbuildable
        | Status.UpToDate
        | Status.OutOfDateWithPrepend
        | Status.OutputMissing
        | Status.OutOfDateWithSelf
        | Status.OutOfDateWithUpstream
        | Status.UpstreamOutOfDate
        | Status.UpstreamBlocked
        | Status.ComputingUpstream
        | Status.TsVersionOutOfDate
        | Status.ContainerOnly;
    export namespace Status {
        /**
         * The project can't be built at all in its current state. For example,
         * its config file cannot be parsed, or it has a syntax error or missing file
         */
        export interface Unbuildable {
            type: UpToDateStatusType.Unbuildable;
            reason: string;
        }

        /**
         * This project doesn't have any outputs, so "is it up to date" is a meaningless question.
         */
        export interface ContainerOnly {
            type: UpToDateStatusType.ContainerOnly;
        }

        /**
         * The project is up to date with respect to its inputs.
         * We track what the newest input file is.
         */
        export interface UpToDate {
            type: UpToDateStatusType.UpToDate | UpToDateStatusType.UpToDateWithUpstreamTypes;
            newestInputFileTime?: Date;
            newestInputFileName?: string;
            newestDeclarationFileContentChangedTime?: Date;
            newestOutputFileTime?: Date;
            newestOutputFileName?: string;
            oldestOutputFileName: string;
        }

        /**
         * The project is up to date with respect to its inputs except for prepend output changed (no declaration file change in prepend).
         */
        export interface OutOfDateWithPrepend {
            type: UpToDateStatusType.OutOfDateWithPrepend;
            outOfDateOutputFileName: string;
            newerProjectName: string;
        }

        /**
         * One or more of the outputs of the project does not exist.
         */
        export interface OutputMissing {
            type: UpToDateStatusType.OutputMissing;
            /**
             * The name of the first output file that didn't exist
             */
            missingOutputFileName: string;
        }

        /**
         * One or more of the project's outputs is older than its newest input.
         */
        export interface OutOfDateWithSelf {
            type: UpToDateStatusType.OutOfDateWithSelf;
            outOfDateOutputFileName: string;
            newerInputFileName: string;
        }

        /**
         * This project depends on an out-of-date project, so shouldn't be built yet
         */
        export interface UpstreamOutOfDate {
            type: UpToDateStatusType.UpstreamOutOfDate;
            upstreamProjectName: string;
        }

        /**
         * This project depends an upstream project with build errors
         */
        export interface UpstreamBlocked {
            type: UpToDateStatusType.UpstreamBlocked;
            upstreamProjectName: string;
        }

        /**
         *  Computing status of upstream projects referenced
         */
        export interface ComputingUpstream {
            type: UpToDateStatusType.ComputingUpstream;
        }

        export interface TsVersionOutOfDate {
            type: UpToDateStatusType.TsVersionOutputOfDate;
            version: string;
        }

        /**
         * One or more of the project's outputs is older than the newest output of
         * an upstream project.
         */
        export interface OutOfDateWithUpstream {
            type: UpToDateStatusType.OutOfDateWithUpstream;
            outOfDateOutputFileName: string;
            newerProjectName: string;
        }
    }
    export const enum UpToDateStatusType {
        Unbuildable = 0,
        UpToDate = 1,
        /**
         * The project appears out of date because its upstream inputs are newer than its outputs,
         * but all of its outputs are actually newer than the previous identical outputs of its (.d.ts) inputs.
         * This means we can Pseudo-build (just touch timestamps), as if we had actually built this project.
         */
        UpToDateWithUpstreamTypes = 2,
        /**
         * The project appears out of date because its upstream inputs are newer than its outputs,
         * but all of its outputs are actually newer than the previous identical outputs of its (.d.ts) inputs.
         * This means we can Pseudo-build (just manipulate outputs), as if we had actually built this project.
         */
        OutOfDateWithPrepend = 3,
        OutputMissing = 4,
        OutOfDateWithSelf = 5,
        OutOfDateWithUpstream = 6,
        UpstreamOutOfDate = 7,
        UpstreamBlocked = 8,
        ComputingUpstream = 9,
        TsVersionOutputOfDate = 10,

        /**
         * Projects with no outputs (i.e. "solution" files)
         */
        ContainerOnly = 11
    }
    export enum ConfigFileProgramReloadLevel {
        None,
        /** Update the file name list from the disk */
        Partial,
        /** Reload completely by re-reading contents of config file from disk and updating program */
        Full
    }
    export interface FileSystemEntries {
        readonly files: ReadonlyArray<string>;
        readonly directories: ReadonlyArray<string>;
    }

    export function matchFiles(
        path: string, extensions: ReadonlyArray<string> | undefined,
        excludes: ReadonlyArray<string> | undefined,
        includes: ReadonlyArray<string> | undefined,
        useCaseSensitiveFileNames: boolean,
        currentDirectory: string, depth: number | undefined,
        getFileSystemEntries: (path: string) => FileSystemEntries,
        realpath: (path: string) => string): string[];
}