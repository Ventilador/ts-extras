import { LanguageService, LineAndCharacter } from "typescript/lib/tsserverlibrary";
import { Mappers } from "./../mappers";
export function toLineColumnOffsetFactory(
    lang: LanguageService,
    { handles, toRedirected, movePosition, outOfBounds, mapLineAndCharacter }: Mappers,
): LanguageService['toLineColumnOffset'] {
    return function (fileName: string, position: number): LineAndCharacter {
debugger;        if (handles(fileName)) {

            const newFileName = toRedirected(fileName);
            const newPosition = movePosition(fileName, newFileName, position);
            if (!outOfBounds(fileName, newFileName, newPosition)) {
                const result = lang.toLineColumnOffset!(newFileName, newPosition);
                return mapLineAndCharacter(newFileName, fileName, result);
            }
        }

        return lang.toLineColumnOffset!(fileName, position);
    }
}





