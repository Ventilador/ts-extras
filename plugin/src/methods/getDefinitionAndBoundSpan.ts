import { DefinitionInfoAndBoundSpan, LanguageService } from "typescript/lib/tsserverlibrary";
import { Mappers } from "./../mappers";
export function getDefinitionAndBoundSpanFactory(
    lang: LanguageService,
    { handles, toRedirected, movePosition, mapDefinitionInfoAndBoundSpan }: Mappers
): LanguageService['getDefinitionAndBoundSpan'] {
    return function (fileName: string, position: number): DefinitionInfoAndBoundSpan | undefined {
debugger;        if (handles(fileName)) {
            const newFileName = toRedirected(fileName);
            const newPosition = movePosition(fileName, newFileName, position);
            const result = lang.getDefinitionAndBoundSpan(newFileName, newPosition);
            if (result) {
                return mapDefinitionInfoAndBoundSpan(newFileName, fileName, result);
            }
            return result;
        }

        return lang.getDefinitionAndBoundSpan(fileName, position);
    }
}





