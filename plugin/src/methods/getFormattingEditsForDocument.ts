import { LanguageService, FormatCodeOptions, FormatCodeSettings, TextChange } from "typescript/lib/tsserverlibrary";
import { Mappers } from "./../mappers";
export function getFormattingEditsForDocumentFactory(lang: LanguageService,
    { handles, toRedirected, mapTextChange }: Mappers): LanguageService['getFormattingEditsForDocument'] {
    return function (fileName: string, options: FormatCodeOptions | FormatCodeSettings): TextChange[] {
        debugger;
debugger;        if (handles(fileName)) {
            const newFileName = toRedirected(fileName);
            const result = lang.getFormattingEditsForDocument(newFileName, options);
            if (result.length) {
                return result.map(i => mapTextChange(newFileName, fileName, i));
            }

            return result;
        }

        return lang.getFormattingEditsForDocument(fileName, options);
    }
}





