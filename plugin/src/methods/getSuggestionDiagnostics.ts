import { DiagnosticWithLocation, LanguageService } from "typescript/lib/tsserverlibrary";
import { Mappers } from "./../mappers";
export function getSuggestionDiagnosticsFactory(
    lang: LanguageService,
    { handles, toRedirected, mapDiagnosticWithLocation }: Mappers
): LanguageService['getSuggestionDiagnostics'] {
    return function (fileName: string): DiagnosticWithLocation[] {
        if (handles(fileName)) {
            const newFileName = toRedirected(fileName);
            const result = lang.getSuggestionDiagnostics(newFileName);
            if (result.length) {
                debugger;
                return result.map(i => mapDiagnosticWithLocation(newFileName, fileName, i));
            }
            return result;
        }

        return lang.getSuggestionDiagnostics(fileName);
    }
}





