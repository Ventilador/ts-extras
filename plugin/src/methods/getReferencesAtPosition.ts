import { LanguageService, ReferenceEntry } from "typescript/lib/tsserverlibrary";
import { UtilsSync } from "./../tsUtils";
import { Mappers } from "./../mappers";
export function getReferencesAtPositionFactory(
    lang: LanguageService,
    { isVueFile, synchronize, toTsFile, calculatePosition }: UtilsSync,
    { outReferenceEntry }: Mappers
): LanguageService['getReferencesAtPosition'] {
    return function (fileName: string, position: number): ReferenceEntry[] | undefined {
        debugger;
        if (isVueFile(fileName)) {
            synchronize();
            const newFileName = toTsFile(fileName);
            const newPosition = calculatePosition({ from: fileName, to: toTsFile(fileName) }, position);
            const result = lang.getReferencesAtPosition(newFileName, newPosition);
            if (result && result.length) {
                return result.map(outReferenceEntry, fileName);
            }
            return result;
        }

        return lang.getReferencesAtPosition(fileName, position);
    }
}





