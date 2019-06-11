import { Move } from "@ts-utils/serialization";
import { Serializer } from "@ts-utils/serialization";

@Move()
export class LineAndCharacter extends Serializer implements ts.LineAndCharacter {
    @Move(Number) line: number;
    @Move(Number) character: number;
}