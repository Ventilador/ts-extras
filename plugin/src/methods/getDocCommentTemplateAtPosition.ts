import { LanguageService, TextInsertion } from "typescript/lib/tsserverlibrary";
import { Mappers } from "./../mappers";
export function getDocCommentTemplateAtPositionFactory(
    lang: LanguageService,
    { handles, toRedirected, movePosition, mapTextInsertion }: Mappers
): LanguageService['getDocCommentTemplateAtPosition'] {
    return function (fileName: string, position: number): TextInsertion | undefined {
        if (handles(fileName)) {
            const newFileName = toRedirected(fileName);
            const newPosition = movePosition(fileName, newFileName, position);
            const result = lang.getDocCommentTemplateAtPosition(newFileName, newPosition);
            if (result) {
                return mapTextInsertion(newFileName, fileName, result);
            }
            return result;
        }

        return lang.getDocCommentTemplateAtPosition(fileName, position);
    }
}





