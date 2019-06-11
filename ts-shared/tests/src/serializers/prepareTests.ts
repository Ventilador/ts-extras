import { FileDataWithTestCases, Cases, ISerializerWithTestCases } from "./generateCases";
import Jasmine = require('jasmine');
import { relative } from "path";
import { Reader } from "@ts-utils/serialization";
declare var expect: <T>(actual: any) => jasmine.Matchers<T> & { toEq: (val: T) => void }
const modes: (keyof Cases)[] = ['some', 'all'];
export function prepareTests(files: FileDataWithTestCases[], instance: Jasmine) {
    describe('Serializers', function () {
        files.forEach(function ({ path, exports, testCases }) {
            path = relative(process.cwd(), path);
            if (path.endsWith('index.js')) {
                return; // skip index, since re exports everything
            }
            describe(path, function () {
                exports.forEach(function ({ value: serializer, name }) {
                    const cases = testCases[name];
                    describe(name, function () {
                        modes.forEach(function (mode) {
                            it(`should support mode "${mode}"`, function () {
                                test(serializer, cases[mode]([]));
                            });
                        })
                    });
                });
            });
        });
    });
   
}
function test(serializer: ISerializerWithTestCases, item: any) {
    const transformedItem = serializer.parse(toReader(serializer.stringify(item)))
    expect(item).toEq(transformedItem);
}
function toReader(val: string | Buffer) {
    return new Reader(val);
}
