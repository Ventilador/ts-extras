import { FormatCodeOptions, FormatCodeSettings, LanguageService, TextChange } from "typescript/lib/tsserverlibrary";
import { Mappers } from "./../mappers";
export function getFormattingEditsForRangeFactory(
    lang: LanguageService,
    { handles }: Mappers
): LanguageService['getFormattingEditsForRange'] {
    return function (fileName: string, start: number, end: number, options: FormatCodeOptions | FormatCodeSettings): TextChange[] {
        if (isVueFile(fileName)) {
            synchronize();
            const newFileName = toTsFile(fileName);
            let result: TextChange[];
            const newStart = Math.max(calculatePosition({ from: fileName, to: toTsFile(fileName) }, start), 0);
            const newEnd = Math.min(calculatePosition({ from: fileName, to: toTsFile(fileName) }, end), getEnd(fileName));
            result = lang.getFormattingEditsForRange(newFileName, newStart, newEnd, options);

            if (result.length) {
                result = result.map(outTextChange, fileName);
            }

            return result;
        }

        return lang.getFormattingEditsForRange(fileName, start, end, options);
    }
}





