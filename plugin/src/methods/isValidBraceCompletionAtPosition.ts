import { LanguageService } from "typescript/lib/tsserverlibrary";
import { UtilsSync } from "./../tsUtils";
import { Mappers } from "./../mappers";
export function isValidBraceCompletionAtPositionFactory(lang: LanguageService, { isVueFile, synchronize, toTsFile, calculatePosition }: UtilsSync, _: Mappers): LanguageService['isValidBraceCompletionAtPosition'] {
    return function (fileName: string, position: number, openingBrace: number): boolean {
        debugger;
        if (isVueFile(fileName)) {
            synchronize();
            const newFileName = toTsFile(fileName);
            const newPosition = calculatePosition({ from: fileName, to: toTsFile(fileName) }, position);
            const result = lang.isValidBraceCompletionAtPosition(newFileName, newPosition, openingBrace);

            return result;
        }

        return lang.isValidBraceCompletionAtPosition(fileName, position, openingBrace);
    }
}





