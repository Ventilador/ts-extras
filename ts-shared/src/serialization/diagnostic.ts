import { Move } from "@ts-extras/serialization";
import { DiagnosticRelatedInformation } from "./diagnosticRelatedInformation";

@Move()
export class Diagnostic extends DiagnosticRelatedInformation implements ts.Diagnostic {
    @Move(Object, true) reportsUnnecessary?: {};
    @Move(String, true) source?: string;
    @Move(Object, true) relatedInformation?: ts.DiagnosticRelatedInformation[];

}