import { TextSpan } from "./textSpan";
import { Move } from "@ts-extras/serialization";
import { Serializer } from "@ts-extras/serialization";

@Move()
export class CompletionEntry extends Serializer implements ts.CompletionEntry {
    @Move(String) name: string;
    @Move(Number) kind: ts.ScriptElementKind;
    @Move(String, true) kindModifiers?: string;
    @Move(String) sortText: string;
    @Move(String, true) insertText?: string;
    @Move(String, true) replacementSpan?: TextSpan;
    @Move(Boolean, true) hasAction?: true;
    @Move(String, true) source?: string;
    @Move(Boolean, true) isRecommended?: true;
}