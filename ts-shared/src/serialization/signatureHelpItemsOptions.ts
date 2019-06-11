import { SignatureHelpTriggerReason } from "./signatureHelpTriggerReason";
import { Move } from "@ts-utils/serialization";
import { Serializer } from "@ts-utils/serialization";

@Move()
export class SignatureHelpItemsOptions extends Serializer {
    @Move(SignatureHelpTriggerReason, true) triggerReason?: SignatureHelpTriggerReason;
}