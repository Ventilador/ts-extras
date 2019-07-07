import { DiagnosticWithLocation, LanguageService } from "typescript/lib/tsserverlibrary";
import { UtilsSync } from "./../tsUtils";
import { Mappers } from "./../mappers";
export function getSuggestionDiagnosticsFactory(
    lang: LanguageService,
    { isVueFile, synchronize, toTsFile }: UtilsSync,
    { outDiagnosticWithLocation }: Mappers
): LanguageService['getSuggestionDiagnostics'] {
    return function (fileName: string): DiagnosticWithLocation[] {
        if (isVueFile(fileName)) {
            synchronize();
            const result = lang.getSuggestionDiagnostics(toTsFile(fileName));
            if (result.length) {
                return result.map(outDiagnosticWithLocation, fileName);
            }
            return result;
        }

        return lang.getSuggestionDiagnostics(fileName);
    }
}





