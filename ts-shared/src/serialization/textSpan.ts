import { Serializer } from "@ts-utils/serialization";
import { Move } from "@ts-utils/serialization";

@Move()
export class TextSpan extends Serializer implements ts.TextSpan {
    @Move(Number) start: number;
    @Move(Number) length: number;
}