import { FormatCodeOptions, FormatCodeSettings, LanguageService, TextChange } from "typescript/lib/tsserverlibrary";
import { Mappers } from "./../mappers";
export function getFormattingEditsAfterKeystrokeFactory(
    lang: LanguageService,
    { handles, toRedirected, movePosition, mapTextChange }: Mappers
): LanguageService['getFormattingEditsAfterKeystroke'] {
    return function (fileName: string, position: number, key: string, options: FormatCodeOptions | FormatCodeSettings): TextChange[] {
        debugger;
debugger;        if (handles(fileName)) {
            const newFileName = toRedirected(fileName);
            const newPosition = movePosition(fileName, newFileName, position);
            const result = lang.getFormattingEditsAfterKeystroke(newFileName, newPosition, key, options);
            if (result.length) {
                return result.map(i => mapTextChange(newFileName, fileName, i));
            }

            return result;
        }

        return lang.getFormattingEditsAfterKeystroke(fileName, position, key, options);
    }
}





