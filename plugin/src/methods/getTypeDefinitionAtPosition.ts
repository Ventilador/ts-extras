import { DefinitionInfo, LanguageService } from "typescript/lib/tsserverlibrary";
import { Mappers } from "./../mappers";
export function getTypeDefinitionAtPositionFactory(
    lang: LanguageService,
    { handles, toRedirected, movePosition, mapDefinitionInfo }: Mappers
): LanguageService['getTypeDefinitionAtPosition'] {
    return function (fileName: string, position: number): ReadonlyArray<DefinitionInfo> | undefined {
debugger;        if (handles(fileName)) {

            const newFileName = toRedirected(fileName);
            const newPosition = movePosition(fileName, newFileName, position);
            const result = lang.getTypeDefinitionAtPosition(newFileName, newPosition);
            if (result && result.length) {
                return result.map(i => mapDefinitionInfo(newFileName, fileName, i));
            }
            return result;
        }

        return lang.getTypeDefinitionAtPosition(fileName, position);
    }
}





