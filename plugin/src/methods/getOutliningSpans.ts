import { LanguageService, OutliningSpan } from "typescript/lib/tsserverlibrary";
import { Utils, UtilsSync } from "./../tsUtils";
import { Mappers } from "./../mappers";
export function getOutliningSpansFactory(
    lang: LanguageService,
    { isVueFile, synchronize, toTsFile }: UtilsSync,
    { outOutliningSpan }: Mappers): LanguageService['getOutliningSpans'] {
    return function (fileName: string): OutliningSpan[] {
        if (isVueFile(fileName)) {
            synchronize();
            const result = lang.getOutliningSpans(toTsFile(fileName));
            if (result.length) {
                return result.map(outOutliningSpan, fileName);
            }
            return result;
        }

        return lang.getOutliningSpans(fileName);
    }
}





