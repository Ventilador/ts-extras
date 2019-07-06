import { Move } from "@ts-extras/serialization";
import { Serializer } from "@ts-extras/serialization";
@Move()
export class SymbolDisplayPart extends Serializer implements ts.SymbolDisplayPart {
    @Move(String) text: string;
    @Move(String) kind: string;
}

