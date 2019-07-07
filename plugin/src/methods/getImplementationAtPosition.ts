import { ImplementationLocation, LanguageService } from "typescript/lib/tsserverlibrary";
import { UtilsSync } from "./../tsUtils";
import { Mappers } from "./../mappers";
export function getImplementationAtPositionFactory(
    lang: LanguageService,
    { isVueFile, synchronize, toTsFile, calculatePosition }: UtilsSync,
    { outImplementationLocation }: Mappers
): LanguageService['getImplementationAtPosition'] {
    return function (fileName: string, position: number): ReadonlyArray<ImplementationLocation> | undefined {
        debugger;
        if (isVueFile(fileName)) {
            synchronize();
            const newFileName = toTsFile(fileName);
            const newPosition = calculatePosition({ from: fileName, to: toTsFile(fileName) }, position);
            const result = lang.getImplementationAtPosition(newFileName, newPosition);
            if (result && result.length) {
                return result && result.map(outImplementationLocation, fileName);
            }
            return result;
        }

        return lang.getImplementationAtPosition(fileName, position);
    }
}





