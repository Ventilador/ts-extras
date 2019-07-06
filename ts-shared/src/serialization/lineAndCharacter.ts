import { Move } from "@ts-extras/serialization";
import { Serializer } from "@ts-extras/serialization";

@Move()
export class LineAndCharacter extends Serializer implements ts.LineAndCharacter {
    @Move(Number) line: number;
    @Move(Number) character: number;
}