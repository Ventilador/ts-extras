import { loaders } from "../../extra-types";
import *as tsLib from 'typescript/lib/tsserverlibrary';
import { createLoader } from '@ts-extras/loaders';
import { createMappers } from "./mappers";
export default function (lib: typeof tsLib) {
    return function (loader: loaders.LoaderExport) {
        const baseLoader = createLoader(loader);
        const builtLoader = createMappers(baseLoader);
        builtLoader
        return { create };
        function create(info: tsLib.server.PluginCreateInfo) {

        }

    };
}
