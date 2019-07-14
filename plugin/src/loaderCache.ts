import { loaders } from "@ts-extras/types";
import { server } from "typescript/lib/tsserverlibrary";

export function addCacheSyncronization(baseLoaders: loaders.BaseLoader, project: server.Project) {
    return baseLoaders;
}