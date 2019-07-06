import { readFile as readFileFs, readFileSync, readdir as readdirFs, readdirSync, writeFileSync, existsSync } from "fs";
import { promisify } from 'util';
const readdir = promisify(readdirFs);
const readFile = promisify(readFileFs);
import { join, resolve } from "path";
import { PackageJson, TsConfig } from "./json";
import { isConstructorDeclaration, isForOfStatement, reduceEachTrailingCommentRange } from "typescript";
type BuildFileInfo = {
    version: string;
    signature: string;
}
type BuildInfo = {
    [key: string]: BuildFileInfo | undefined;
}
type BuildVersion = {
    packageJson?: PackageJson;
    info?: BuildInfo;
}
const versionsPath = '../versions.json';
const versions = (function (): Record<string, BuildVersion | undefined> {
    try {
        return require(versionsPath);
    } catch{
        return {};
    }
})();

const workspaces = Object.create(null) as Record<string, Workspace | undefined>;
export class Workspace {
    static Save() {
        writeFileSync(resolve(__dirname, versionsPath), JSON.stringify(versions, undefined, '  '));
    }
    private _name: string;
    private _folder: string;
    private _json: PackageJson;
    private _tsConfig: TsConfig | null;
    private _parent: Workspace | null;
    constructor(parent: Workspace | null, name: string, folder: string, json: PackageJson, tsConfig: TsConfig | null) {
        workspaces[json.name] = this;
        this._parent = parent;
        this._name = name;
        this._folder = folder;
        this._json = json;
        this._tsConfig = tsConfig;
    }

    update() {
        const info = this.buildInfo();
        if (!info && !this.noEmit()) {
            throw new Error(`Workspace "${this._name}" has not been built`);
        }
        versions[this._name] = {
            packageJson: this.distPackageJson(),
            info: info || undefined
        }
        return this;
    }

    @Memoize()
    distFolder() {
        if (this.noEmit()) {
            return;
        }

        return resolve(this._folder, this._tsConfig!.compilerOptions!.outDir!);
    }

    @Memoize()
    distPackageJson() {
        return {
            name: this.name(),
            version: this.version(),
            description: this.description(),
            bin: this.bin(),
            main: this.main(),
            repository: this.repository(),
            author: this.author(),
            bugs: this.bugs(),
            engines: this.engines(),
            homepage: this.homepage(),
            keywords: this.keywords(),
            licenses: this.licenses(),
            peerDependencies: this.peerDependencies(),
        }
    }

    @Memoize()
    distPackExists() {
        if (this.distFolder()) {
            return existsSync(resolve(this.distFolder()!, 'package.json'));
        }

        return false;
    }

    @Memoize()
    changed() {
        if (this.noEmit()) {
            return false;
        }
        return this.needsWritingPackageJson() || this.didChange();
    }

    @Memoize()
    private didChange(): boolean {
        if (shouldContinue(this._name)) {
            const version = getWorkspaceVersion(this._name);
            let shouldPublish = isFirstTime(version);
            shouldPublish = shouldPublish || this.dependencies().some(i => workspaces[i]!.didChange());
            try {
                return shouldPublish || checkBuildInfo(this.buildInfo(), version.info!);
            } catch{
                return true;
            } finally {
                onStackDone(this._name);
            }
        }
        // we are recursing, so return false, if there where other changes they will popup
        // should also be safe for memoizing, since its recursive and does not release the cb to make it null,
        // and value will be the last one which is not this one
        return false;
    }

    @Memoize()
    private needsWritingPackageJson() {
        if (this.noEmit()) {
            return false;
        }
        if (!this.distPackExists()) {
            return true;
        }
        return false;
    }

    @Memoize()
    private noEmit() {
        return !!(!this._tsConfig || this._tsConfig.compilerOptions && this._tsConfig.compilerOptions.noEmit);
    }

    @Memoize()
    private name() {
        return this._json.name;
    }

    @Memoize()
    private author(): string {
        const author = this._json.author || this._parent!._json.author;
        if (author) {
            return author;
        }

        throw new Error(`Cannot find author for "${this._name}"`);
    }

    @Memoize()
    private bin() {
        return this._json.bin;
    }

    @Memoize()
    private bugs() {
        return this._json.bugs || this._parent!._json.bugs;
    }

    @Memoize()
    private description() {
        if (this._json.description) {
            return this._json.description;
        }

        throw new Error(`Workspace "${this._name}" does not have a description`);
    }

    @Memoize()
    private engines() {
        return this._json.engines;
    }

    @Memoize()
    private homepage() {
        return this._json.homepage;
    }

    @Memoize()
    private keywords() {
        if (this._json.keywords && this._json.keywords.length) {
            return this._json.keywords;
        }

        throw new Error(`Workspace "${this._name}" does not have keywords`);
    }

    @Memoize()
    private licenses() {
        return this._json.licenses || this._parent!._json.licenses;
    }

    @Memoize()
    private main() {
        return this._json.main.replace('dist/', '');
    }

    @Memoize()
    private peerDependencies(): Record<string, string> | undefined {
        return this.dependencies().reduce((prev, workspaceName) => {
            if (workspaces[workspaceName]) {
                prev[workspaces[workspaceName]!.name()] = workspaces[workspaceName]!.version();
                return prev;
            }

            throw new Error(`"${workspaceName}" was not created`);
        }, {} as Record<string, string>);
    }

    @Memoize()
    private dependencies(): string[] {
        return Object.keys(getAllImportsFromTsUtils(this._folder)).filter(i => i !== 'register').filter(Boolean).map(i => '@ts-extras/' + i);
    }

    @Memoize()
    private repository() {
        return this._parent ? this._parent._json.repository : this._json.repository;
    }


    @Memoize()
    private buildInfo(): BuildInfo | null {
        if (this._tsConfig && this._tsConfig!.compilerOptions && this._tsConfig!.compilerOptions.tsBuildInfoFile) {
            const content = readFileSync(join(this._folder, this._tsConfig!.compilerOptions.tsBuildInfoFile), 'utf8');
            return JSON.parse(content).program.fileInfos;
        }

        return null;
    }

    @Memoize()
    private version(): string {
        const version = (this._getWorkspaceSavedVersion()) || (this._json.version) || (this._parent && this._parent._json.version) || ('0.0.1');
        if (this.didChange()) {
            return upVersion(version);
        }
        return version;
    }

    private _getWorkspaceSavedVersion(): string | undefined {
        const pack = getWorkspaceVersion(this._name).packageJson;
        return pack && pack.version;
    }
}
const stack: string[] = [];
function shouldContinue(name: string) {
    if (stack.includes(name)) {
        return false;
    }

    return !!stack.push(name);
}

function onStackDone(name: string) {
    if (stack.pop() !== name) {
        throw new Error('Unsync');
    }
}

function Memoize(): (proto: any, name: string) => PropertyDescriptor {
    return function (proto: any, name: string) {
        let cb = proto[name];
        return {
            value: function () {
                const result = cb.apply(this, arguments);
                (this as any)[name] = valueFn(result);
                return result;
            }
        }
    };
}

function valueFn(val: any) {
    return function () {
        return val;
    }
}


function getAllImportsFromTsUtils(path: string) {
    const found: Record<string, boolean> = {};
    return readDirSync(path);
    function readDirSync(path: string) {
        let files: string[] = [];
        try {
            files = readdirSync(path).map(j => join(path, j)).filter(i => !i.includes('node_modules') || !i.includes('dist'));
        } catch{
            tryFile(path);
            return found;
        }

        files.forEach(readDirSync);
        return found;
    }
    function tryFile(path: string) {
        if (path.endsWith('.ts')) {
            try {
                const content = readFileSync(path, 'utf-8')
                let index = 0;
                while (true) {
                    index = content.indexOf('@ts-extras/', index);
                    if (index === -1) {
                        return;
                    }

                    const utilsName = /@ts-extras\/([^'"]+)['"].*/.exec(content.slice(index));
                    if (utilsName) {
                        found[utilsName[1]] = true;
                    }
                    index++;
                }
            } catch{ }
        }
    }


}


function upVersion(version: string) {
    const split = version.split('.');
    split[2] = (+split[2] + 1).toString();
    return split.join('.');
}

function checkBuildInfo(pubInfo?: BuildInfo | null, distInfo?: BuildInfo) {
    if (!pubInfo || !distInfo) {
        return true;
    }
    const pubFiles = Object.keys(pubInfo);
    const distFiles = Object.keys(distInfo);
    if (pubFiles.length !== distFiles.length) {
        return true;
    }

    if (areDifferentArrays(pubFiles, distFiles)) {
        return true;
    }

    for (const file of pubFiles) {
        if (textChanged(pubInfo[file]!.signature, distInfo[file]!.signature) || textChanged(pubInfo[file]!.version, distInfo[file]!.version)) {
            return true;
        }
    }

    return false;
}

function textChanged(pubSig: string, distSig: string): boolean {
    return pubSig !== distSig;
}

function areDifferentArrays(pubFiles: string[], distFiles: string[]): boolean {
    pubFiles.sort();
    distFiles.sort();
    for (let i = 0; i < pubFiles.length; i++) {
        if (pubFiles[i] !== distFiles[i]) {
            return true;
        }
    }

    return false;
}

function isFirstTime(info: BuildVersion): info is {} {
    return !info.info || !info.packageJson;
}

function getWorkspaceVersion(name: string) {
    return versions[name] || (versions[name] = {
        packageJson: undefined, info: undefined
    });
}
