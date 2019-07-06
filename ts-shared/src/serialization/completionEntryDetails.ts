import { Move, Enum } from "@ts-extras/serialization";
import { SymbolDisplayPart } from "./symbolDisplayPart";
import { CodeAction } from "./codeAction";
import { Serializer } from "@ts-extras/serialization";
import { JSDocTagInfo } from "./jSDocTagInfo";

@Move()
export class CompletionEntryDetails extends Serializer implements ts.CompletionEntryDetails {
    @Move(String) name: string;
    @Move(Enum) kind: ts.ScriptElementKind;
    @Move(String) kindModifiers: string;
    @Move([SymbolDisplayPart]) displayParts: SymbolDisplayPart[];
    @Move([SymbolDisplayPart], true) documentation?: SymbolDisplayPart[];
    @Move([JSDocTagInfo], true) tags?: JSDocTagInfo[];
    @Move([CodeAction], true) codeActions?: [];
    @Move([SymbolDisplayPart], true) source?: SymbolDisplayPart[];
}