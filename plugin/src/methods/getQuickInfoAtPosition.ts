import { LanguageService, QuickInfo } from "typescript/lib/tsserverlibrary";
import { Utils, UtilsSync } from "./../tsUtils";
import { Mappers } from "./../mappers";
export function getQuickInfoAtPositionFactory(
    lang: LanguageService,
    { isVueFile, synchronize, toTsFile, calculatePosition }: UtilsSync,
    { outQuickInfo }: Mappers
): LanguageService['getQuickInfoAtPosition'] {
    return function (fileName: string, position: number): QuickInfo | undefined {
        if (isVueFile(fileName)) {
            synchronize();
            const newFileName = toTsFile(fileName);
            const newPosition = calculatePosition({ from: fileName, to: toTsFile(fileName) }, position);
            const result = lang.getQuickInfoAtPosition(newFileName, newPosition);
            if (result) {
                return outQuickInfo(fileName, result);
            }
            return result;
        }

        return lang.getQuickInfoAtPosition(fileName, position);
    }
}





