import { LanguageService, TextSpan } from "typescript/lib/tsserverlibrary";
import { UtilsSync } from "./../tsUtils"; import { Mappers } from "./../mappers";
export function getSpanOfEnclosingCommentFactory(
    lang: LanguageService,
    { isVueFile, synchronize, toTsFile, calculatePosition }: UtilsSync,
    { outTextSpan }: Mappers
): LanguageService['getSpanOfEnclosingComment'] {
    return function (fileName: string, position: number, onlyMultiLine: boolean): TextSpan | undefined {
        debugger;
        if (isVueFile(fileName)) {
            synchronize();
            const newFileName = toTsFile(fileName);
            const newPosition = calculatePosition({ from: fileName, to: toTsFile(fileName) }, position);
            const result = lang.getSpanOfEnclosingComment(newFileName, newPosition, onlyMultiLine);
            if (result) {
                return outTextSpan(fileName, result);
            }
            return result;
        }

        return lang.getSpanOfEnclosingComment(fileName, position, onlyMultiLine);
    }
}





