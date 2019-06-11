import { ISerializer } from "@ts-utils/serialization";

export function requireSerializers(paths: string[]): FileData[] {
    return paths
        .map(require)
        .map(mapToFileData, paths);
}

export type FileData = {
    exports: ExportInfo[];
    module: any;
    path: string;
}

export type ExportInfo = {
    name: string;
    value: ISerializer;
}

function mapToFileData(this: string, module: any, index: number): FileData {
    return {
        exports: getExportsName(module),
        module: module,
        path: this[index]
    };
}

function getExportsName(module: any) {
    return Object.keys(module).filter(notESModuleKey).map(toExportInto, module);
}

function toExportInto(this: any, name: string) {
    return {
        name: name,
        value: this[name]
    }
}

function notESModuleKey(val: string) {
    return val !== 'default' && val !== '__esModule';
}
