import { Move } from "@ts-extras/serialization";
import { HighlightSpan } from "./highlightSpan";
import { Serializer } from "@ts-extras/serialization";

@Move()
export class DocumentHighlights extends Serializer implements ts.DocumentHighlights {
    @Move(String) fileName: string;
    @Move([HighlightSpan]) highlightSpans: HighlightSpan[];
}