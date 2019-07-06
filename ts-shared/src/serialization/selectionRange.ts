import { TextSpan } from "./textSpan";
import { Move } from "@ts-extras/serialization";
import { Serializer } from "@ts-extras/serialization";

@Move()
export class SelectionRange extends Serializer implements ts.SelectionRange {
    @Move(TextSpan) textSpan: TextSpan;
    @Move(SelectionRange, true) parent?: SelectionRange;
}