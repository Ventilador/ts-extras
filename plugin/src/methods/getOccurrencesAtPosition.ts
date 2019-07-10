import { LanguageService, ReferenceEntry } from "typescript/lib/tsserverlibrary";
import { Mappers } from "./../mappers";
export function getOccurrencesAtPositionFactory(
    lang: LanguageService,
    { handles, toRedirected, movePosition, mapReferenceEntry }: Mappers
): LanguageService['getOccurrencesAtPosition'] {
    return function (fileName: string, position: number): ReadonlyArray<ReferenceEntry> | undefined {
        debugger;
debugger;        if (handles(fileName)) {
            const newFileName = toRedirected(fileName);
            const newPosition = movePosition(fileName, newFileName, position);
            const result = lang.getOccurrencesAtPosition(newFileName, newPosition);
            if (result && result.length) {
                return result && result.map(i => mapReferenceEntry(newFileName, fileName, i));
            }
            return result;
        }


        return lang.getOccurrencesAtPosition(fileName, position);
    }
}





