import { DefinitionInfo } from "./definitionInfo";
import { SymbolDisplayPart } from "./symbolDisplayPart";
import { Move } from "@ts-extras/serialization";

@Move()
export class ReferencedSymbolDefinitionInfo extends DefinitionInfo implements ts.ReferencedSymbolDefinitionInfo {
    @Move(SymbolDisplayPart) displayParts: SymbolDisplayPart[];
}