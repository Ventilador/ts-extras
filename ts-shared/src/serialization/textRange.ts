import { Serializer } from "@ts-utils/serialization";
import { Move } from "@ts-utils/serialization";

@Move()
export class TextRange extends Serializer implements ts.TextRange {
    @Move(Number) pos: number;
    @Move(Number) end: number;
}