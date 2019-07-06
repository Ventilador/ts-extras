import { Serializer } from "@ts-extras/serialization";
import { Move } from "@ts-extras/serialization";

@Move()
export class TextRange extends Serializer implements ts.TextRange {
    @Move(Number) pos: number;
    @Move(Number) end: number;
}