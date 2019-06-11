import { SymbolDisplayPart } from "./symbolDisplayPart";
import { JSDocTagInfo } from "./jSDocTagInfo";
import { SignatureHelpParameter } from "./signatureHelpParameter";
import { Move } from "@ts-utils/serialization";
import { Serializer } from "@ts-utils/serialization";

@Move()
export class SignatureHelpItem extends Serializer implements ts.SignatureHelpItem {
    @Move(Boolean) isVariadic: boolean;
    @Move([SymbolDisplayPart]) prefixDisplayParts: SymbolDisplayPart[];
    @Move([SymbolDisplayPart]) suffixDisplayParts: SymbolDisplayPart[];
    @Move([SymbolDisplayPart]) separatorDisplayParts: SymbolDisplayPart[];
    @Move([SignatureHelpParameter]) parameters: SignatureHelpParameter[];
    @Move([SymbolDisplayPart]) documentation: SymbolDisplayPart[];
    @Move([JSDocTagInfo]) tags: JSDocTagInfo[];
}