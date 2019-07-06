import { loaders } from "@ts-extras/types";

export function mapExtensions(loaders: loaders.Loader[], extensions?: ReadonlyArray<string>) {
    if (loaders.length) {
        if (extensions) {
            return extensions.concat(loaders.map(getExt));
        }

        return loaders.map(getExt);
    }

    return extensions;
}
function getExt(loader: loaders.Loader) {
    return loader.extension;
}