import { ApplicableRefactorInfo, LanguageService, TextRange, UserPreferences } from "typescript/lib/tsserverlibrary";
import { Mappers } from "../mappers";
export function getApplicableRefactorsFactory(
    lang: LanguageService,
    { handles, mapNumberOrTextRange, outOfBounds, toRedirected, mapApplicableRefactorInfo }: Mappers
): LanguageService['getApplicableRefactors'] {
    return function (fileName: string, positionOrRange: number | TextRange, preferences: UserPreferences | undefined): ApplicableRefactorInfo[] {
debugger;        if (handles(fileName)) {

            const newFileName = toRedirected(fileName);
            const newPosition = mapNumberOrTextRange(fileName, newFileName, positionOrRange);
            if (outOfBounds(fileName, newFileName, newPosition)) {
                return [];
            }
            const result = lang.getApplicableRefactors(newFileName, newPosition, preferences);
            if (result.length) {
                return result.map(i => mapApplicableRefactorInfo(newFileName, fileName, i));
            }
            return result;
        }


        return lang.getApplicableRefactors(fileName, positionOrRange, preferences);
    }
}





