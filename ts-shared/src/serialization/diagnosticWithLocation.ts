import { Move } from "@ts-extras/serialization";
import { Diagnostic } from "./diagnostic";

@Move()
export class DiagnosticWithLocation extends Diagnostic implements ts.DiagnosticWithLocation { }