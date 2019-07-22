import { server } from "typescript/lib/tsserverlibrary";
import { applyChangesInOpenFilesFactory, OpenFileArguments } from "./applyChangesInOpenFiles";
import { Mappers } from "../mappers";
import { ServerCache } from "../loaderCache";
const patched = Symbol('patched');
export function patchProject(service: server.ProjectService, mappers: Mappers, serverCache: ServerCache): void;
export function patchProject(service: any, mappers: Mappers, serverCache: ServerCache): void {
    if (needsPatching(service.applyChangesInOpenFiles)) {
        patch(service, 'applyChangesInOpenFiles', applyChangesInOpenFilesFactory(service.applyChangesInOpenFiles, mappers, serverCache));
        wrapWithDebugger(service, 'openExternalProject');
        wrapWithDebugger(service, 'openExternalProjects');
        wrapWithDebugger(service, 'synchronizeProjectList' as any);
        wrapWithDebugger(service, 'openClientFileWithNormalizedPath');
        wrapWithDebugger(service, 'reloadProjects');
    }
    const openedFiles = (service as server.ProjectService).openFiles;
    const files: string[] = [];
    openedFiles.forEach((_, file) => {
        if (mappers.handles(file)) {
            files.push(file);
        }
    });
    const filesToOpen: OpenFileArguments[] = [];
    files.forEach(file => {
        mappers.redirect(file, function (_from, to) {
            filesToOpen.push({
                fileName: to,
                hasMixedContent: false,
            });
            return true;
        });
    });
    if (filesToOpen.length) {
        process.nextTick(() => {
            service.applyChangesInOpenFiles(arrayToIterator(filesToOpen));
        });
    }
}

function arrayToIterator(arr: any[]): Iterator<any> {
    let index = 0;
    return {
        next() {
            if (index === arr.length) {
                return { done: true, value: null as any };
            }

            return { done: false, value: arr[index++] };
        }
    }
}

function patch(service: any, method: string, wrapper: any) {
    wrapper[patched] = true;
    service[method] = wrapper;
}

function needsPatching(method: any) {
    return !method[patched];
}

function wrapWithDebugger(service: server.ProjectService, method: keyof server.ProjectService) {
    const orig = service[method] as any;
    if (!needsPatching(orig)) {
        return orig;
    }
    return patch(service, method, function (this: server.ProjectService) {
        debugger;
        void method;
        return orig.apply(this, arguments);
    });
}
