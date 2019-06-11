import { Move } from "@ts-utils/serialization";
import { CompletionEntry } from "./completionEntry";
import { Serializer } from "@ts-utils/serialization";

@Move()
export class WithMetadataCompletionInfo extends Serializer implements ts.WithMetadata<ts.CompletionInfo> {
    @Move(Object, true) metadata?: unknown;
    /** Not true for all glboal completions. This will be true if the enclosing scope matches a few syntax kinds. See `isSnippetScope`. */
    @Move(Boolean, true) isGlobalCompletion: boolean;
    @Move(Boolean, true) isMemberCompletion: boolean;
    /**
     * true when the current location also allows for a new identifier
     */
    @Move(Boolean, true) isNewIdentifierLocation: boolean;
    @Move([CompletionEntry]) entries: CompletionEntry[];
}