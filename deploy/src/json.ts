
export interface PackageJson {
    name: string;
    version: string;
    description: string;
    keywords: string;
    author?: string;
    homepage: string;
    repository: string;
    bugs: string;
    licenses: string[];
    engines?: Record<string, string>;
    main: string;
    peerDependencies?: Record<string, string>;
    dependencies?: Record<string, string>;
    bin?: Record<string, string>
}

export interface TsConfig {
    compilerOptions?: CompilerOptions;
    references?: { path: string }[];
}

export interface CompilerOptions {
    noEmit?: boolean;
    rootDir: string;
    outDir?: string;
    baseUrl: string;
    tsBuildInfoFile: string;
}
