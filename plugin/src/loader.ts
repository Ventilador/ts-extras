import { loaders, fs } from "../../extra-types";
import *as tsLib from 'typescript/lib/tsserverlibrary';
import { createServerLoader, createBaseLoader } from '@ts-extras/loaders';
import { createMappers, Mappers } from "./mappers";
import { MethodFactories } from "./methods";
import { patchProject } from "./project";
import { patchFsLikeMethods } from "./createFsMethodWrappers";
import { createFs } from "@ts-extras/mem-fs";
import { addCacheSyncronization } from "./loaderCache";
const dir = process.cwd();
export default function (loader: loaders.LoaderExport) {
    const baseLoader = createBaseLoader(loader);
    const fs = createFs(dir, false);
    let extFiles: string[] | undefined;
    return function ({ typescript: lib }: { typescript: typeof tsLib }) {
        return { create, getExternalFiles };
    };
    function create(info: tsLib.server.PluginCreateInfo) {
        const serverLoaders = createServerLoader(loader, addCacheSyncronization(baseLoader, info.project));
        const mappers = createMappers(serverLoaders);
        patchProject(info.project.projectService, mappers);
        patchFsLikeMethods(info.serverHost, info.project.projectName, mappers);
        extFiles = readExtFiles(fs, info, serverLoaders);
        return createService(info.languageService, Object.keys(info.languageService) as any, mappers);

    }
    function getExternalFiles() {
        return extFiles;
    }
}

function readExtFiles(fs: fs.MemoryFileSystem, info: tsLib.server.PluginCreateInfo, serverLoaders: loaders.ServerLoader) {
    return Array.from(fs.readDirectory(info.project.getCurrentDirectory(), [serverLoaders.extension]).reduce(reduceReadDir, new Set<string>()));
    function reduceReadDir(prev: Set<string>, cur: string) {
        if (serverLoaders.handles(cur)) {
            serverLoaders.redirect(cur, function (from, to) {
                fs.writeVirtualFile(from, to, parser);
                prev.add(to);
            })
        }
        prev.add(cur);
        return prev;
    }

    function parser(from: string, to: string, content: string) {
        return serverLoaders.parse(from, to, content).newText;
    }

}




function createService(lang: any, keys: (keyof tsLib.LanguageService)[], mappers: Mappers) {
    return keys.reduce((prev: any, cur: keyof tsLib.LanguageService) => {
        if (MethodFactories[cur + 'Factory']) {
            prev[cur] = MethodFactories[cur + 'Factory'](lang, mappers);
        } else {
            prev[cur] = lang[cur];
        }
        return prev;
    }, {}) as tsLib.LanguageService;
}
