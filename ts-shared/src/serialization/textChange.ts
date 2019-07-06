import { TextSpan } from "./textSpan";
import { Move } from "@ts-extras/serialization";
import { Serializer } from "@ts-extras/serialization";

@Move()
export class TextChange extends Serializer implements ts.TextChange {
    @Move(TextSpan) span: TextSpan;
    @Move(String) newText: string;
}