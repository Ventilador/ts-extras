import { UserPreferences } from "./userPreferences";
import { Move } from "@ts-utils/serialization";

@Move()
export class GetCompletionsAtPositionOptions extends UserPreferences implements ts.GetCompletionsAtPositionOptions {
    @Move(String, true) triggerCharacter?: ts.CompletionsTriggerCharacter;
    @Move(Boolean, true) includeExternalModuleExports?: boolean;
    @Move(Boolean, true) includeInsertTextCompletions?: boolean;
}