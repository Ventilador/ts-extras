import { DocumentSpan } from "./documentSpan";
import { SymbolDisplayPart } from "./symbolDisplayPart";
import { Move, Enum } from "@ts-utils/serialization";

@Move()
export class ImplementationLocation extends DocumentSpan implements ts.ImplementationLocation {
    @Move(Enum) kind: ts.ScriptElementKind;
    @Move([SymbolDisplayPart]) displayParts: SymbolDisplayPart[];
}