import { server, ScriptKind } from "typescript/lib/tsserverlibrary";
import { applyChangesInOpenFilesFactory } from "./applyChangesInOpenFiles";
import { Mappers } from "../mappers";
const patched = Symbol('patched');
export function patchProject(service: server.ProjectService, mappers: Mappers): void;
export function patchProject(service: any, mappers: Mappers): void {
    if (needsPatching(service.applyChangesInOpenFiles)) {
        patch(service, 'applyChangesInOpenFiles', applyChangesInOpenFilesFactory(service.applyChangesInOpenFiles, mappers));
        wrapWithDebugger(service, 'openExternalProject');
        wrapWithDebugger(service, 'openExternalProjects');
        wrapWithDebugger(service, 'synchronizeProjectList' as any);
        wrapWithDebugger(service, 'openClientFileWithNormalizedPath');
        // wrapWithDebugger(service, 'closeClientFile');
        wrapWithDebugger(service, 'reloadProjects');
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
