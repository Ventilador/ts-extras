import { CodeAction } from "./codeAction";
import { Move } from "@ts-utils/serialization";

@Move()
export class CodeFixAction extends CodeAction implements ts.CodeFixAction {
    @Move(String) fixName: string;
    @Move(Object) fixId?: {};
    @Move(String) fixAllDescription?: string;
}