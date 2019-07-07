import { LanguageService, SelectionRange } from "typescript/lib/tsserverlibrary";
import { UtilsSync } from "./../tsUtils";
import { Mappers } from "./../mappers";
export function getSmartSelectionRangeFactory(
    lang: LanguageService,
    { isVueFile, synchronize, toTsFile, calculatePosition }: UtilsSync,
    { outSelectionRange }: Mappers
): LanguageService['getSmartSelectionRange'] {
    return function (fileName: string, position: number): SelectionRange {
        if (isVueFile(fileName)) {
            synchronize();
            const newFileName = toTsFile(fileName);
            const newPosition = calculatePosition({ from: fileName, to: toTsFile(fileName) }, position);
            const result = lang.getSmartSelectionRange(newFileName, newPosition);
            if (result) {
                return outSelectionRange(fileName, result);
            }
            return result;
        }

        return lang.getSmartSelectionRange(fileName, position);
    }
}





