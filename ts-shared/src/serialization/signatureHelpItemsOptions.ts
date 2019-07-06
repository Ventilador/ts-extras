import { SignatureHelpTriggerReason } from "./signatureHelpTriggerReason";
import { Move } from "@ts-extras/serialization";
import { Serializer } from "@ts-extras/serialization";

@Move()
export class SignatureHelpItemsOptions extends Serializer {
    @Move(SignatureHelpTriggerReason, true) triggerReason?: SignatureHelpTriggerReason;
}