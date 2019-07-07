import { DefinitionInfo, LanguageService } from "typescript/lib/tsserverlibrary";
import { UtilsSync } from "./../tsUtils";
import { Mappers } from "./../mappers";
export function getTypeDefinitionAtPositionFactory(
    lang: LanguageService,
    { isVueFile, synchronize, toTsFile, calculatePosition }: UtilsSync,
    { outDefinitionInfo }: Mappers
): LanguageService['getTypeDefinitionAtPosition'] {
    return function (fileName: string, position: number): ReadonlyArray<DefinitionInfo> | undefined {
        if (isVueFile(fileName)) {
            synchronize();
            const newFileName = toTsFile(fileName);
            const newPosition = calculatePosition({ from: fileName, to: toTsFile(fileName) }, position);
            const result = lang.getTypeDefinitionAtPosition(newFileName, newPosition);
            if (result && result.length) {
                return result.map(outDefinitionInfo, fileName);
            }
            return result;
        }

        return lang.getTypeDefinitionAtPosition(fileName, position);
    }
}





