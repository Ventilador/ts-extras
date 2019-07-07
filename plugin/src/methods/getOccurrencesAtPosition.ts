import { LanguageService, ReferenceEntry } from "typescript/lib/tsserverlibrary";
import { Utils, UtilsSync } from "./../tsUtils";
import { Mappers } from "./../mappers";
export function getOccurrencesAtPositionFactory(
    lang: LanguageService,
    { isVueFile, synchronize, toTsFile, calculatePosition }: UtilsSync,
    { outReferenceEntry }: Mappers
): LanguageService['getOccurrencesAtPosition'] {
    return function (fileName: string, position: number): ReadonlyArray<ReferenceEntry> | undefined {
        debugger;
        if (isVueFile(fileName)) {
            synchronize();
            const newFileName = toTsFile(fileName);
            const newPosition = calculatePosition({ from: fileName, to: toTsFile(fileName) }, position);
            const result = lang.getOccurrencesAtPosition(newFileName, newPosition);
            if (result && result.length) {
                return result && result.map(outReferenceEntry, fileName);
            }
            return result;
        }


        return lang.getOccurrencesAtPosition(fileName, position);
    }
}





