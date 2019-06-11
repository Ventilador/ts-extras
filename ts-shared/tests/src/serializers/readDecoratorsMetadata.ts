import { FileData, ExportInfo } from "./requireSerializer";
import { collectMetadata } from '@ts-utils/serialization/';
import { IMoveMetadata } from "@ts-utils/serialization/dist/decorators/moveImpl";
export function readDecoratorsMetadata(fileData: FileData[]): FileDataWithMoveMetadata[] {
    return fileData.map(item => {
        loadProperties(item);
        return item as FileDataWithMoveMetadata;
    });
}

function loadProperties(item: FileData) {
    item.exports.forEach(loadClassProperties, (item as FileDataWithMoveMetadata).exportMetadata = {});
}

function loadClassProperties(this: ExportMetadata, cur: ExportInfo) {
    this[cur.name] = collectMetadata(cur.value as any);
}

export type FileDataWithMoveMetadata = {
    exportMetadata: ExportMetadata;
} & FileData;

export type ExportMetadata = Record<string, IMoveMetadata[]>;
