import { LanguageService, TextSpan } from "typescript/lib/tsserverlibrary";
import {  UtilsSync } from "./../tsUtils";
import { Mappers } from "./../mappers";
export function getNameOrDottedNameSpanFactory(
    lang: LanguageService,
    { isVueFile, synchronize, toTsFile, calculatePosition }: UtilsSync,
    { outTextSpan }: Mappers
): LanguageService['getNameOrDottedNameSpan'] {
    return function (fileName: string, startPos: number, endPos: number): TextSpan | undefined {
        debugger;
        if (isVueFile(fileName)) {
            synchronize();
            const newFileName = toTsFile(fileName);
            const newStart = calculatePosition({ from: fileName, to: toTsFile(fileName) }, startPos);
            const newEnd = calculatePosition({ from: fileName, to: toTsFile(fileName) }, endPos);
            const result = lang.getNameOrDottedNameSpan(newFileName, newStart, newEnd);
            if (result) {

                return outTextSpan(fileName, result);
            }
        }

        return lang.getNameOrDottedNameSpan(fileName, startPos, endPos);
    }
}





