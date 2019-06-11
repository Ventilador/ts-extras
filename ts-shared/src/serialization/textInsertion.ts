import { Move } from "@ts-utils/serialization";
import { Serializer } from "@ts-utils/serialization";

@Move()
export class TextInsertion extends Serializer implements ts.TextInsertion {
    @Move(String) newText: string;
    @Move(Number) caretOffset: number;
}