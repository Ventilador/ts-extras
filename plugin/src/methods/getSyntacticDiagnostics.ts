import { DiagnosticWithLocation, LanguageService } from "typescript/lib/tsserverlibrary";
import { Mappers } from "../mappers";
import { UtilsSync } from "../tsUtils";
export function getSyntacticDiagnosticsFactory(
    lang: LanguageService,
    { isVueFile, synchronize, toTsFile }: UtilsSync,
    { outDiagnosticWithLocation }: Mappers
): LanguageService['getSyntacticDiagnostics'] {
    return function (fileName: string): DiagnosticWithLocation[] {
        if (isVueFile(fileName)) {
            synchronize();
            const result = lang.getSyntacticDiagnostics(toTsFile(fileName));
            if (result.length) {
                return result.map(outDiagnosticWithLocation, fileName);
            }
            return result;
        }


        return lang.getSyntacticDiagnostics(fileName);
    }
}





