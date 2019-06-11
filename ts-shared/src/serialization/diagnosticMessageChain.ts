import { Serializer } from "@ts-utils/serialization";
import { Move } from "@ts-utils/serialization";

@Move()
export class DiagnosticMessageChain extends Serializer implements ts.DiagnosticMessageChain {
    @Move(String) messageText: string;
    @Move(Number) category: ts.DiagnosticCategory;
    @Move(Number) code: number;
    @Move(DiagnosticMessageChain, true) next?: ts.DiagnosticMessageChain;
}