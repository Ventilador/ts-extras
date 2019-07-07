import { Diagnostic, LanguageService } from "typescript/lib/tsserverlibrary";
import { UtilsSync } from "./../tsUtils";
import { Mappers } from "./../mappers";
export function getSemanticDiagnosticsFactory(lang: LanguageService, utils: UtilsSync, { outDiagnostic }: Mappers): LanguageService['getSemanticDiagnostics'] {
    const { isVueFile, synchronize, toTsFile } = utils;
    return function (fileName: string): Diagnostic[] {
        if (isVueFile(fileName)) {
            synchronize();
            const result = lang.getSemanticDiagnostics(toTsFile(fileName));
            if (result.length) {
                return result.map(outDiagnostic, fileName);
            }
            return result;
        }

        return lang.getSemanticDiagnostics(fileName);
    }
}





