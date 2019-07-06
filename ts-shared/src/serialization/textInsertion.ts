import { Move } from "@ts-extras/serialization";
import { Serializer } from "@ts-extras/serialization";

@Move()
export class TextInsertion extends Serializer implements ts.TextInsertion {
    @Move(String) newText: string;
    @Move(Number) caretOffset: number;
}