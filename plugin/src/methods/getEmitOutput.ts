import { EmitOutput, LanguageService } from "typescript/lib/tsserverlibrary";
import { Mappers } from "./../mappers";
export function getEmitOutputFactory(lang: LanguageService, { handles, toRedirected }: Mappers): LanguageService['getEmitOutput'] {
    return function (fileName: string, emitOnlyDtsFiles: boolean | undefined): EmitOutput {
        debugger;
        if (handles(fileName)) {
            const result = lang.getEmitOutput(toRedirected(fileName), emitOnlyDtsFiles);
            // should rebuild the file?
            if (result) {
                return result;
            }
            return result;
        }


        return lang.getEmitOutput(fileName, emitOnlyDtsFiles);
    }
}





