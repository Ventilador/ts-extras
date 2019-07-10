import { LanguageService } from "typescript/lib/tsserverlibrary";
import { Mappers } from "./../mappers";
export function isValidBraceCompletionAtPositionFactory(lang: LanguageService,
    { handles, toRedirected, movePosition }: Mappers
): LanguageService['isValidBraceCompletionAtPosition'] {
    return function (fileName: string, position: number, openingBrace: number): boolean {
        debugger;
debugger;        if (handles(fileName)) {

            const newFileName = toRedirected(fileName);
            const newPosition = movePosition(fileName, newFileName, position);
            const result = lang.isValidBraceCompletionAtPosition(newFileName, newPosition, openingBrace);

            return result;
        }

        return lang.isValidBraceCompletionAtPosition(fileName, position, openingBrace);
    }
}





