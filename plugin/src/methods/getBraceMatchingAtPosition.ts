import { LanguageService, TextSpan } from "typescript/lib/tsserverlibrary";
import { Mappers } from "../mappers";
export function getBraceMatchingAtPositionFactory(
    lang: LanguageService,
    { toRedirected, handles, movePosition, mapTextSpan }: Mappers
): LanguageService['getBraceMatchingAtPosition'] {
    return function (fileName: string, position: number): TextSpan[] {
        debugger;
        if (handles(fileName)) {
            const newFileName = toRedirected(fileName);
            const newPosition = movePosition(fileName, newFileName, position);
            const result = lang.getBraceMatchingAtPosition(newFileName, newPosition);
            if (result.length) {
                return result.map(i => mapTextSpan(newFileName, fileName, i));
            }
            return result;
        }

        return lang.getBraceMatchingAtPosition(fileName, position);
    }
}





