import { Serializer } from "@ts-utils/serialization";
import { FileTextChanges } from "./fileTextChanges";
import { CodeActionCommand } from './codeActionCommand'
import { Move } from "@ts-utils/serialization";

@Move()
export class RefactorEditInfo extends Serializer implements ts.RefactorEditInfo {
    @Move([FileTextChanges]) edits: FileTextChanges[];
    @Move(String) renameFilename?: string;
    @Move(Number, true) renameLocation?: number;
    @Move([CodeActionCommand], true) commands?: ts.CodeActionCommand[];
}