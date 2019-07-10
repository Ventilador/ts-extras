import { ImplementationLocation, LanguageService } from "typescript/lib/tsserverlibrary";
import { Mappers } from "./../mappers";
export function getImplementationAtPositionFactory(
    lang: LanguageService,
    { handles, toRedirected, movePosition, mapImplementationLocation }: Mappers
): LanguageService['getImplementationAtPosition'] {
    return function (fileName: string, position: number): ReadonlyArray<ImplementationLocation> | undefined {
        debugger;
debugger;        if (handles(fileName)) {

            const newFileName = toRedirected(fileName);
            const newPosition = movePosition(fileName, newFileName, position);
            const result = lang.getImplementationAtPosition(newFileName, newPosition);
            if (result && result.length) {
                return result && result.map(i => mapImplementationLocation(newFileName, fileName, i));
            }
            return result;
        }

        return lang.getImplementationAtPosition(fileName, position);
    }
}





