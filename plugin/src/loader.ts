import { loaders } from "../../extra-types";
import *as tsLib from 'typescript/lib/tsserverlibrary';
import { createLoader } from '@ts-extras/loaders';
import { createMappers, Mappers } from "./mappers";
import { MethodFactories } from "./methods";
import { patchProject } from "./project";
import { patchFsLikeMethods } from "./createFsMethodWrappers";
import { createFs } from "@ts-extras/mem-fs";
const dir = process.cwd();
export default function (loader: loaders.LoaderExport) {
    const baseLoader = createLoader(loader);
    const builtLoader = createMappers(baseLoader);
    const fs = createFs(dir, false);
    return function ({ typescript: lib }: { typescript: typeof tsLib }) {
        patchProject(lib.server.ProjectService.prototype, builtLoader);
        return {
            create,
            // getExternalFiles
        };
    };
    function create(info: tsLib.server.PluginCreateInfo) {
        patchFsLikeMethods(info.serverHost, info.project.projectName, builtLoader);
        return createService(info.languageService, Object.keys(info.languageService) as any, builtLoader);
    }
    function getExternalFiles(project: tsLib.server.Project) {
        return Array.from(fs.readDirectory(project.getCurrentDirectory(), [builtLoader.extension], ['**/node_modules', '**/dist']).reduce(reduceReadDir, new Set<string>()));
    }
    function reduceReadDir(prev: Set<string>, cur: string) {
        if (cur.includes('node_modules') || cur.includes('dist')) {
            return prev;
        }
        if (builtLoader.handles(cur)) {
            builtLoader.redirect(cur, function (from, to) {
                fs.writeVirtualFile(from, to, function (content) {
                    return builtLoader.readContent(from, to, content);
                });
                prev.add(to);
            })
        }
        prev.add(cur);
        return prev;
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
