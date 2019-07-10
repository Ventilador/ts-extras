import { LanguageService, TextSpan } from "typescript/lib/tsserverlibrary";
import { Mappers } from "./../mappers";
export function getNameOrDottedNameSpanFactory(
    lang: LanguageService,
    { handles, toRedirected, movePosition, mapTextSpan }: Mappers
): LanguageService['getNameOrDottedNameSpan'] {
    return function (fileName: string, startPos: number, endPos: number): TextSpan | undefined {
        debugger;
debugger;        if (handles(fileName)) {

            const newFileName = toRedirected(fileName);
            const newStart = movePosition(fileName, newFileName, startPos);
            const newEnd = movePosition(fileName, newFileName, endPos);
            const result = lang.getNameOrDottedNameSpan(newFileName, newStart, newEnd);
            if (result) {

                return mapTextSpan(newFileName, fileName, result);
            }
        }

        return lang.getNameOrDottedNameSpan(fileName, startPos, endPos);
    }
}





