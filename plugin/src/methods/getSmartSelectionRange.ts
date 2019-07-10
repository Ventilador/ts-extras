import { LanguageService, SelectionRange } from "typescript/lib/tsserverlibrary";
import { Mappers } from "./../mappers";
export function getSmartSelectionRangeFactory(
    lang: LanguageService,
    { handles, toRedirected, movePosition, mapSelectionRange }: Mappers
): LanguageService['getSmartSelectionRange'] {
    return function (fileName: string, position: number): SelectionRange {
debugger;        if (handles(fileName)) {

            const newFileName = toRedirected(fileName);
            const newPosition = movePosition(fileName, newFileName, position);
            const result = lang.getSmartSelectionRange(newFileName, newPosition);
            if (result) {
                return mapSelectionRange(newFileName, fileName, result);
            }
            return result;
        }

        return lang.getSmartSelectionRange(fileName, position);
    }
}





