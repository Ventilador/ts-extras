import { Move } from "@ts-utils/serialization";
import { Serializer } from "@ts-utils/serialization";
@Move()
export class SymbolDisplayPart extends Serializer implements ts.SymbolDisplayPart {
    @Move(String) text: string;
    @Move(String) kind: string;
}

