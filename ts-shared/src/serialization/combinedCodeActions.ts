import { FileTextChanges } from "./fileTextChanges";
import { Move, Serializer } from "@ts-utils/serialization";
import { CodeActionCommand } from './codeActionCommand';

@Move()
export class CombinedCodeActions extends Serializer implements ts.CombinedCodeActions {
    @Move([FileTextChanges]) changes: ReadonlyArray<FileTextChanges>;
    @Move(CodeActionCommand) commands?: ReadonlyArray<ts.CodeActionCommand>;
}