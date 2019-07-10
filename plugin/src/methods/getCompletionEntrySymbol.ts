import { LanguageService, Symbol } from "typescript/lib/tsserverlibrary";
import { Mappers } from "./../mappers";
export function getCompletionEntrySymbolFactory(
    lang: LanguageService,
    { handles, toRedirected, movePosition }: Mappers
): LanguageService['getCompletionEntrySymbol'] {
    return function (fileName: string, position: number, name: string, source: string | undefined): Symbol | undefined {
        debugger;
debugger;        if (handles(fileName)) {

            const newFileName = toRedirected(fileName);
            const newPosition = movePosition(fileName, newFileName, position);
            const result = lang.getCompletionEntrySymbol(newFileName, newPosition, name, source);
            if (result) {
                return result;
            }
            return result;
        }


        return lang.getCompletionEntrySymbol(fileName, position, name, source);
    }
}





