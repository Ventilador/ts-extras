import { FileTextChanges, FormatCodeSettings, LanguageService, UserPreferences } from "typescript/lib/tsserverlibrary";
import { Mappers } from "./../mappers";
export function getEditsForFileRenameFactory(
    lang: LanguageService,
    { mapFileTextChanges, handles, toRedirected, wasRedirected }: Mappers
): LanguageService['getEditsForFileRename'] {
    return function (oldFilePath: string, newFilePath: string, formatOptions: FormatCodeSettings, preferences: UserPreferences | undefined): ReadonlyArray<FileTextChanges> {
        return lang
            .getEditsForFileRename(oldFilePath, newFilePath, formatOptions, preferences)
            .map(change => {
debugger;                if (handles(change.fileName)) {
                    return mapFileTextChanges(change.fileName, toRedirected(change.fileName), change)
                }
                const newFile = wasRedirected(change.fileName)
                if (newFile) {
                    mapFileTextChanges(newFile, change.fileName, change)
                }
                return change;
            });
    }

}





