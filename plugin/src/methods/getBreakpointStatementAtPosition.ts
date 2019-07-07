import { LanguageService, TextSpan } from "typescript/lib/tsserverlibrary";
import { Mappers } from "../mappers";
export function getBreakpointStatementAtPositionFactory(
    lang: LanguageService,
    { handles, toRedirected, movePosition, mapTextSpan }: Mappers
): LanguageService['getBreakpointStatementAtPosition'] {
    return function (fileName: string, position: number): TextSpan | undefined {
        debugger;
        if (handles(fileName)) {
            const newFileName = toRedirected(fileName);
            const newPosition = movePosition(fileName, newFileName, position);
            const result = lang.getBreakpointStatementAtPosition(newFileName, newPosition);
            if (result) {
                return mapTextSpan(newFileName, fileName, result);
            }

            return result;
        }

        return lang.getBreakpointStatementAtPosition(fileName, position);
    }
}





