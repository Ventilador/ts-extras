import { TextSpan } from "./textSpan";
import { Serializer } from "@ts-utils/serialization";
import { Move, Enum } from "@ts-utils/serialization";

@Move()
export class RenameInfo extends Serializer {
    @Move(Boolean) canRename: boolean;
    @Move(String, true) fileToRename?: string;
    @Move(String) displayName: string;
    @Move(String) fullDisplayName: string;
    @Move(Enum) kind: ts.ScriptElementKind;
    @Move(String) kindModifiers: string;
    @Move(TextSpan) triggerSpan: TextSpan;
    @Move(String, true) localizedErrorMessage?: string;
}