import { JsxClosingTagInfo, LanguageService } from "typescript/lib/tsserverlibrary";
import { Mappers } from "./../mappers";
export function getJsxClosingTagAtPositionFactory(
    lang: LanguageService,
    { handles, toRedirected, movePosition, mapJsxClosingTagInfo }: Mappers
): LanguageService['getJsxClosingTagAtPosition'] {
    return function (fileName: string, position: number): JsxClosingTagInfo | undefined {
debugger;        if (handles(fileName)) {

            const newFileName = toRedirected(fileName);
            const newPosition = movePosition(fileName, newFileName, position);
            const result = lang.getJsxClosingTagAtPosition(newFileName, newPosition);
            if (result) {
                return mapJsxClosingTagInfo(newFileName, fileName, result);
            }
        }

        return lang.getJsxClosingTagAtPosition(fileName, position);
    }
}





