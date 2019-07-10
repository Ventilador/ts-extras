import { LanguageService, TextSpan } from "typescript/lib/tsserverlibrary";
import { Mappers } from "../mappers";
export function getSpanOfEnclosingCommentFactory(
    lang: LanguageService,
    { handles, toRedirected, movePosition, mapTextSpan }: Mappers
): LanguageService['getSpanOfEnclosingComment'] {
    return function (fileName: string, position: number, onlyMultiLine: boolean): TextSpan | undefined {
        debugger;
debugger;        if (handles(fileName)) {

            const newFileName = toRedirected(fileName);
            const newPosition = movePosition(fileName, newFileName, position);
            const result = lang.getSpanOfEnclosingComment(newFileName, newPosition, onlyMultiLine);
            if (result) {
                return mapTextSpan(newFileName, fileName, result);
            }
            return result;
        }

        return lang.getSpanOfEnclosingComment(fileName, position, onlyMultiLine);
    }
}





