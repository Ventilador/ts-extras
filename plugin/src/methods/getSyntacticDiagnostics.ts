import { DiagnosticWithLocation, LanguageService } from "typescript/lib/tsserverlibrary";
import { Mappers } from "../mappers";
export function getSyntacticDiagnosticsFactory(
    lang: LanguageService,
    { handles, toRedirected, mapDiagnosticWithLocation }: Mappers
): LanguageService['getSyntacticDiagnostics'] {
    return function (fileName: string): DiagnosticWithLocation[] {
        if (handles(fileName)) {
            const newFileName = toRedirected(fileName);
            const result = lang.getSyntacticDiagnostics(newFileName);
            if (result.length) {
                return result.map(i => mapDiagnosticWithLocation(newFileName, fileName, i));
            }
            return result;
        }


        return lang.getSyntacticDiagnostics(fileName);
    }
}





