import { Serializer } from "@ts-extras/serialization";
import { FileTextChanges } from "./fileTextChanges";
import { CodeActionCommand } from './codeActionCommand'
import { Move } from "@ts-extras/serialization";

@Move()
export class RefactorEditInfo extends Serializer implements ts.RefactorEditInfo {
    @Move([FileTextChanges]) edits: FileTextChanges[];
    @Move(String) renameFilename?: string;
    @Move(Number, true) renameLocation?: number;
    @Move([CodeActionCommand], true) commands?: ts.CodeActionCommand[];
}