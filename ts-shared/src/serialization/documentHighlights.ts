import { Move } from "@ts-utils/serialization";
import { HighlightSpan } from "./highlightSpan";
import { Serializer } from "@ts-utils/serialization";

@Move()
export class DocumentHighlights extends Serializer implements ts.DocumentHighlights {
    @Move(String) fileName: string;
    @Move([HighlightSpan]) highlightSpans: HighlightSpan[];
}