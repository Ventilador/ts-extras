import { Serializer } from "@ts-utils/serialization";
import { Move } from "@ts-utils/serialization";

@Move()
export class SignatureHelpTriggerReason extends Serializer {
    @Move(String) kind: string;
    @Move(String, true) triggerCharacter?: string;
}