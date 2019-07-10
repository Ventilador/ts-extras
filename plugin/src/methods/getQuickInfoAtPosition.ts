import { LanguageService, QuickInfo } from "typescript/lib/tsserverlibrary";
import { Mappers } from "./../mappers";
export function getQuickInfoAtPositionFactory(
    lang: LanguageService,
    { handles, toRedirected, movePosition, mapQuickInfo }: Mappers
): LanguageService['getQuickInfoAtPosition'] {
    return function (fileName: string, position: number): QuickInfo | undefined {
debugger;        if (handles(fileName)) {
            const newFileName = toRedirected(fileName);
            const newPosition = movePosition(fileName, newFileName, position);
            const result = lang.getQuickInfoAtPosition(newFileName, newPosition);
            if (result) {
                return mapQuickInfo(newFileName, fileName, result);
            }
            return result;
        }

        return lang.getQuickInfoAtPosition(fileName, position);
    }
}





