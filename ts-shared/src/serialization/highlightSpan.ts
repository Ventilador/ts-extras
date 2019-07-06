import { Move, Enum } from "@ts-extras/serialization";
import { TextSpan } from "./textSpan";
import { Serializer } from "@ts-extras/serialization";

@Move()
export class HighlightSpan extends Serializer implements ts.HighlightSpan {
    @Move(String, true) fileName?: string;
    @Move(Boolean, true) isInString?: true;
    @Move(TextSpan, true) textSpan: TextSpan;
    @Move(Enum, true) kind: ts.HighlightSpanKind;
}