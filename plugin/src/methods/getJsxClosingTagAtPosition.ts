import { JsxClosingTagInfo, LanguageService } from "typescript/lib/tsserverlibrary";
import {  UtilsSync } from "./../tsUtils";
import { Mappers } from "./../mappers";
export function getJsxClosingTagAtPositionFactory(
    lang: LanguageService,
    { isVueFile, synchronize, toTsFile, calculatePosition }: UtilsSync,
    { outJsxClosingTagInfo }: Mappers
): LanguageService['getJsxClosingTagAtPosition'] {
    return function (fileName: string, position: number): JsxClosingTagInfo | undefined {
        if (isVueFile(fileName)) {
            synchronize();
            const newFileName = toTsFile(fileName);
            const newPosition = calculatePosition({ from: fileName, to: toTsFile(fileName) }, position);
            const result = lang.getJsxClosingTagAtPosition(newFileName, newPosition);
            if (result) {
                return outJsxClosingTagInfo(fileName, result);
            }
        }

        return lang.getJsxClosingTagAtPosition(fileName, position);
    }
}





