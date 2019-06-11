import { FileDataWithMoveMetadata } from "../readDecoratorsMetadata";
import { ISerializer, IMoveMetadata } from "@ts-utils/serialization";
import { makeCase } from "./makeCase";
import { ExportInfo } from "../requireSerializer";
export type FileDataWithTestCases = {
    testCases: TestCases;
    exportMetadata: Record<string, MoveMetadataWithTestCases[]>;
    exports: ExportInfoWithCases[];
} & FileDataWithMoveMetadata;
export type TestCases = Record<string, Cases>;
export type MoveMetadataWithTestCases = IMoveMetadata & { arg: ISerializerWithTestCases };
export type ISerializerWithTestCases = ISerializer & { cases: Cases };
export type Cases = {
    all: TestCase;
    some: TestCase;
}
export type TestCase = (context: ISerializerWithTestCases[]) => any;
export type ExportInfoWithCases = {
    value: ISerializerWithTestCases;
} & ExportInfo;
export function generateCases(files: FileDataWithMoveMetadata[]): FileDataWithTestCases[] {
    const myFiles = files as FileDataWithTestCases[];
    myFiles.forEach(loadTestCases);
    return myFiles;

    function loadTestCases(data: FileDataWithTestCases): void {
        data.testCases = {}
        data.exports.forEach(makeClassTestCases, data);
    }

    function makeClassTestCases(this: FileDataWithTestCases, data: ExportInfoWithCases) {
        setTestCases(this.testCases, data, {
            all: makeCase(this.exportMetadata[data.name], 'all'),
            some: makeCase(this.exportMetadata[data.name], 'some')
        });
    }
}
function setTestCases(testCases: TestCases, { value, name }: ExportInfoWithCases, cases: Cases) {
    testCases[name] = value.cases = cases;
}