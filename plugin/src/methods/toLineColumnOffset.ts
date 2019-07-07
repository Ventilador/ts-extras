import { LanguageService, LineAndCharacter } from "typescript/lib/tsserverlibrary";
import { UtilsSync } from "./../tsUtils";
import { Mappers } from "./../mappers";
export function toLineColumnOffsetFactory(
    lang: LanguageService,
    { isVueFile, synchronize, toTsFile, calculatePosition, outOfBounds }: UtilsSync,
    { outLineAndCharacter }: Mappers): LanguageService['toLineColumnOffset'] {
    return function (fileName: string, position: number): LineAndCharacter {
        if (isVueFile(fileName)) {
            synchronize();
            const newFileName = toTsFile(fileName);
            const newPosition = calculatePosition({ from: fileName, to: toTsFile(fileName) }, position);
            if (!outOfBounds(fileName, newPosition)) {
                const result = lang.toLineColumnOffset!(newFileName, newPosition);
                return outLineAndCharacter(fileName, result);
            }
        }

        return lang.toLineColumnOffset!(fileName, position);
    }
}





