import { Metadata, Reader } from '@ts-utils/serialization';
import { LanguageServerAsync } from '@ts-utils/shared';
declare var expect: <T>(actual: any) => jasmine.Matchers<T> & { toEq: (val: T) => void }

export function createArgLangServiceTester(metadata: Metadata): LanguageServerAsync {
    return metadata.methods.reduce(function (prev, { name, args }) {
        prev[name] = function (...testCase: any[]) {
            expect(args.parser(toReader(args.stringifier(testCase)))).toEq(testCase);
        }
        return prev;
    }, {} as any)

}

function toReader(val: string | Buffer) {
    return new Reader(val);
}