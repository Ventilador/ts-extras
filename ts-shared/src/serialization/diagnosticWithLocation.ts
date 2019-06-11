import { Move } from "@ts-utils/serialization";
import { Diagnostic } from "./diagnostic";

@Move()
export class DiagnosticWithLocation extends Diagnostic implements ts.DiagnosticWithLocation { }