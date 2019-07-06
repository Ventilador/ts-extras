import { Serializer } from "@ts-extras/serialization";
import { Move, Enum } from "@ts-extras/serialization";
import { DiagnosticMessageChain } from "./diagnosticMessageChain";
import { SourceFile } from "./sourceFile";
import { Diagnostic } from "./diagnostic";

@Move()
export class DiagnosticRelatedInformation extends Serializer implements ts.DiagnosticRelatedInformation {
    @Move(Enum) category: ts.DiagnosticCategory;
    @Move(Number) code: number;
    @Move(SourceFile) file: ts.SourceFile;
    @Move(Number) start: number;
    @Move(Number) length: number;
    @Move(String) private messageTextAsString: string;
    @Move(DiagnosticMessageChain) private messageTextAsDiagnosticMessageChain: ts.DiagnosticMessageChain;

    get messageText() {
        return this.messageTextAsString || this.messageTextAsDiagnosticMessageChain
    }
}