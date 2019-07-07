import { CodeFixAction, FormatCodeSettings, LanguageService, UserPreferences } from "typescript/lib/tsserverlibrary";
import { Mappers } from "../mappers";
export function getCodeFixesAtPositionFactory(
    lang: LanguageService,
    { mapCodeFixAction, handles, toRedirected, movePosition }: Mappers
): LanguageService['getCodeFixesAtPosition'] {
    return function (fileName: string, start: number, end: number, errorCodes: ReadonlyArray<number>, formatOptions: FormatCodeSettings, preferences: UserPreferences): ReadonlyArray<CodeFixAction> {
        if (handles(fileName)) {
            const newFileName = toRedirected(fileName);
            const newStart = movePosition(fileName, newFileName, start);
            const newEnd = movePosition(fileName, newFileName, end);
            const result = lang.getCodeFixesAtPosition(newFileName, newStart, newEnd, errorCodes, formatOptions, preferences);
            if (result.length) {
                return result.map(i => mapCodeFixAction(newFileName, fileName, i));
            }

            return result;
        }

        return lang.getCodeFixesAtPosition(fileName, start, end, errorCodes, formatOptions, preferences);
    }
}





