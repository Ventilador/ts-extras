import { FormatCodeOptions, FormatCodeSettings, LanguageService, TextChange } from "typescript/lib/tsserverlibrary";
import { Mappers } from "./../mappers";
export function getFormattingEditsForRangeFactory(
    lang: LanguageService,
    { handles, toRedirected, movePositionWithinFile, mapTextChange }: Mappers
): LanguageService['getFormattingEditsForRange'] {
    return function (fileName: string, start: number, end: number, options: FormatCodeOptions | FormatCodeSettings): TextChange[] {
debugger;        if (handles(fileName)) {

            const newFileName = toRedirected(fileName);
            let result: TextChange[];
            const newStart = movePositionWithinFile(fileName, newFileName, start);
            const newEnd = movePositionWithinFile(fileName, newFileName, end);
            result = lang.getFormattingEditsForRange(newFileName, newStart, newEnd, options);

            if (result.length) {
                result = result.map(i => mapTextChange(newFileName, fileName, i));
            }

            return result;
        }

        return lang.getFormattingEditsForRange(fileName, start, end, options);
    }
}





