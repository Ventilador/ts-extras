import { DocumentHighlights, LanguageService } from "typescript/lib/tsserverlibrary";
import { Mappers } from "./../mappers";
export function getDocumentHighlightsFactory(
    lang: LanguageService,
    { handles, toRedirected, movePosition, mapDocumentHighlights }: Mappers
): LanguageService['getDocumentHighlights'] {
    return function (fileName: string, position: number, filesToSearch: string[]): DocumentHighlights[] | undefined {
        if (handles(fileName)) {
            const newFileName = toRedirected(fileName);
            const newPosition = movePosition(fileName, newFileName, position);
            filesToSearch = filesToSearch.map(file => handles(file) ? toRedirected(file) : file);
            const result = lang.getDocumentHighlights(newFileName, newPosition, filesToSearch);
            if (result && result.length) {
                return result.map(i => mapDocumentHighlights(newFileName, fileName, i));
            }
            return result;
        }

        return lang.getDocumentHighlights(fileName, position, filesToSearch);
    }
}





