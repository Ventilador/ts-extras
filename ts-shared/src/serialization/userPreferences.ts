import { Move } from "@ts-utils/serialization";
import { Serializer } from "@ts-utils/serialization";

@Move()
export class UserPreferences extends Serializer implements ts.UserPreferences {
    @Move(Boolean, true) readonly disableSuggestions?: boolean;
    @Move(String, true) readonly quotePreference?: "auto" | "double" | "single";
    @Move(Boolean, true) readonly includeCompletionsForModuleExports?: boolean;
    @Move(Boolean, true) readonly includeCompletionsWithInsertText?: boolean;
    @Move(String, true) readonly importModuleSpecifierPreference?: "relative" | "non-relative";
    @Move(String, true) readonly importModuleSpecifierEnding?: "minimal" | "index" | "js";
    @Move(Boolean, true) readonly allowTextChangesInNewFiles?: boolean;
    @Move(Boolean, true) readonly providePrefixAndSuffixTextForRename?: boolean;
}
