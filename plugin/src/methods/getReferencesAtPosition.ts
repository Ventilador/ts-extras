import { LanguageService, ReferenceEntry } from "typescript/lib/tsserverlibrary";
import { Mappers } from "./../mappers";
export function getReferencesAtPositionFactory(
    lang: LanguageService,
    { handles, toRedirected, movePosition, mapReferenceEntry }: Mappers
): LanguageService['getReferencesAtPosition'] {
    return function (fileName: string, position: number): ReferenceEntry[] | undefined {
        debugger;
debugger;        if (handles(fileName)) {

            const newFileName = toRedirected(fileName);
            const newPosition = movePosition(fileName, newFileName, position);
            const result = lang.getReferencesAtPosition(newFileName, newPosition);
            if (result && result.length) {
                return result.map(i => mapReferenceEntry(newFileName, fileName, i));
            }
            return result;
        }

        return lang.getReferencesAtPosition(fileName, position);
    }
}





