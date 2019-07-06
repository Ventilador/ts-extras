import { Serializer } from "@ts-extras/serialization";
import { Move } from "@ts-extras/serialization";

@Move()
export class SignatureHelpTriggerReason extends Serializer {
    @Move(String) kind: string;
    @Move(String, true) triggerCharacter?: string;
}