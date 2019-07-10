import { LanguageService, FormatCodeSettings, TextRange, UserPreferences, RefactorEditInfo } from "typescript/lib/tsserverlibrary";
import { Mappers } from "./../mappers";
export function getEditsForRefactorFactory(
    lang: LanguageService,
    { handles, toRedirected, mapNumberOrTextRange, mapRefactorEditInfo }: Mappers
): LanguageService['getEditsForRefactor'] {
    return function (fileName: string, formatOptions: FormatCodeSettings, positionOrRange: number | TextRange, refactorName: string, actionName: string, preferences: UserPreferences | undefined): RefactorEditInfo | undefined {
debugger;        if (handles(fileName)) {
            const newFileName = toRedirected(fileName);
            const position = mapNumberOrTextRange(fileName, newFileName, positionOrRange);
            const result = lang.getEditsForRefactor(newFileName, formatOptions, position, refactorName, actionName, preferences);
            if (result) {
                return mapRefactorEditInfo(newFileName, fileName, result);
            }

            return result;
        }

        return lang.getEditsForRefactor(fileName, formatOptions, positionOrRange, refactorName, actionName, preferences);
    }
}





