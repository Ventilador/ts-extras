import { TextSpan } from "./textSpan";
import { SignatureHelpItem } from "./signatureHelpItem";
import { Move, Serializer } from "@ts-extras/serialization";

@Move()
export class SignatureHelpItems extends Serializer implements ts.SignatureHelpItems {
    @Move([SignatureHelpItem]) items: SignatureHelpItem[];
    @Move(TextSpan) applicableSpan: TextSpan;
    @Move(Number) selectedItemIndex: number;
    @Move(Number) argumentIndex: number;
    @Move(Number) argumentCount: number;
}