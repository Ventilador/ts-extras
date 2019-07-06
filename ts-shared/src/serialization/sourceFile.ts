import { Move } from "@ts-extras/serialization";
import { Serializer } from "@ts-extras/serialization";

@Move()
export class SourceFile extends Serializer implements ts.SourceFile {
    static from(path: string): SourceFile {
        return { fileName: path } as any;
    }
    public reviver?: (value: { fileName: string }, into: SourceFile) => void;
    constructor(value: { fileName: string }) {
        super();
        if (this.reviver) {
            this.reviver(value, this);
        }
    }
    @Move(String) fileName: string;
}
export interface SourceFile extends ts.SourceFile { }

class FakeSourceFile implements ts.SourceFile {
    constructor(public fileName: string) { }
}
interface FakeSourceFile extends ts.SourceFile { }


const invalidPropAccess = {
    get: invalid
};
Object.defineProperties(FakeSourceFile.prototype, [
    '_declarationBrand',
    'kind',
    'statements',
    'endOfFileToken',
    'fileName',
    'text',
    'amdDependencies',
    'moduleName',
    'referencedFiles',
    'typeReferenceDirectives',
    'libReferenceDirectives',
    'languageVariant',
    'isDeclarationFile',
    'hasNoDefaultLib',
    'languageVersion',
].reduce((prev, key) => {
    prev[key] = invalidPropAccess;
    return prev;
}, {}));

function invalid() {
    throw new Error('Cannot read property from fake SourceFile');
}