import { SymbolDisplayPart } from "./symbolDisplayPart";
import { TextSpan } from "./textSpan";
import { Move, Serializer } from "@ts-extras/serialization";
import { JSDocTagInfo } from "./jSDocTagInfo";

@Move()
export class QuickInfo extends Serializer implements ts.QuickInfo {
    @Move(Number) kind: ts.ScriptElementKind;
    @Move(String) kindModifiers: string;
    @Move(TextSpan) textSpan: TextSpan;
    @Move([SymbolDisplayPart], true) displayParts?: SymbolDisplayPart[];
    @Move([SymbolDisplayPart], true) documentation?: SymbolDisplayPart[];
    @Move([JSDocTagInfo], true) tags?: JSDocTagInfo[];
}