import { Serializer } from "@ts-extras/serialization";
import { Move } from "@ts-extras/serialization";

@Move()
export class TextSpan extends Serializer implements ts.TextSpan {
    @Move(Number) start: number;
    @Move(Number) length: number;
}