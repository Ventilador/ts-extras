import { Move } from "@ts-utils/serialization";
import { Serializer } from "@ts-utils/serialization";
import { FileTextChanges } from "./fileTextChanges";

@Move()
export class CodeAction extends Serializer implements ts.CodeAction {
    @Move(String) description: string;
    @Move([FileTextChanges]) changes: FileTextChanges[];
    @Move(Object, true) commands?: ts.CodeActionCommand[];
}