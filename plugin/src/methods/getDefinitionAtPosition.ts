import { DefinitionInfo, LanguageService } from "typescript/lib/tsserverlibrary";
import { Mappers } from "../mappers";

export function getDefinitionAtPositionFactory(
    lang: LanguageService,
    { handles, toRedirected, movePosition, mapDefinitionInfo }: Mappers
): LanguageService['getDefinitionAtPosition'] {
    return function (fileName: string, position: number): ReadonlyArray<DefinitionInfo> | undefined {
debugger;        if (handles(fileName)) {
            const newFileName = toRedirected(fileName);
            const newPosition = movePosition(fileName, newFileName, position);
            const result = lang.getDefinitionAtPosition(newFileName, newPosition);
            if (result && result.length) {
                return result && result.map(i => mapDefinitionInfo(newFileName, fileName, i));
            }
            return result;
        }

        return lang.getDefinitionAtPosition(fileName, position);
    }
}





