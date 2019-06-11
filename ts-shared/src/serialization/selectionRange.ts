import { TextSpan } from "./textSpan";
import { Move } from "@ts-utils/serialization";
import { Serializer } from "@ts-utils/serialization";

@Move()
export class SelectionRange extends Serializer implements ts.SelectionRange {
    @Move(TextSpan) textSpan: TextSpan;
    @Move(SelectionRange, true) parent?: SelectionRange;
}