import { CompletionEntryDetails, FormatCodeOptions, FormatCodeSettings, LanguageService, UserPreferences } from "typescript/lib/tsserverlibrary";
import { Mappers } from "./../mappers";
export function getCompletionEntryDetailsFactory(
    lang: LanguageService,
    { handles, toRedirected, movePosition, mapCompletionEntryDetails }: Mappers
): LanguageService['getCompletionEntryDetails'] {
    return function (fileName: string, position: number, name: string, formatOptions: FormatCodeOptions | FormatCodeSettings | undefined, source: string | undefined, preferences: UserPreferences | undefined): CompletionEntryDetails | undefined {
        if (handles(fileName)) {
            const newFileName = toRedirected(fileName);
            const newPosition = movePosition(fileName, newFileName, position);
            const result = lang.getCompletionEntryDetails(newFileName, newPosition, name, formatOptions, source, preferences);
            if (result) {
                return mapCompletionEntryDetails(newFileName, fileName, result);
            }
            return result;
        }

        return lang.getCompletionEntryDetails(fileName, position, name, formatOptions, source, preferences);
    }
}





