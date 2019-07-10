import { Diagnostic, LanguageService } from "typescript/lib/tsserverlibrary";
import { Mappers } from "./../mappers";
export function getSemanticDiagnosticsFactory(lang: LanguageService,
    { handles, toRedirected, mapDiagnostic }: Mappers): LanguageService['getSemanticDiagnostics'] {
    return function (fileName: string): Diagnostic[] {
debugger;        if (handles(fileName)) {
            const newFileName = toRedirected(fileName);
            const result = lang.getSemanticDiagnostics(newFileName);
            if (result.length) {
                return result.map(i => mapDiagnostic(newFileName, fileName, i));
            }
            return result;
        }

        return lang.getSemanticDiagnostics(fileName);
    }
}





