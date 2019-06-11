import { TextSpan } from "./textSpan";
import { Move } from "@ts-utils/serialization";
import { Serializer } from "@ts-utils/serialization";

@Move()
export class TextChange extends Serializer implements ts.TextChange {
    @Move(TextSpan) span: TextSpan;
    @Move(String) newText: string;
}