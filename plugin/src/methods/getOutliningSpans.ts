import { LanguageService, OutliningSpan } from "typescript/lib/tsserverlibrary";
import { Mappers } from "./../mappers";
export function getOutliningSpansFactory(
    lang: LanguageService,
    { handles, toRedirected, mapOutliningSpan }: Mappers): LanguageService['getOutliningSpans'] {
    return function (fileName: string): OutliningSpan[] {
debugger;        if (handles(fileName)) {
            const newFileName = toRedirected(fileName);
            const result = lang.getOutliningSpans(newFileName);
            if (result.length) {
                return result.map(i => mapOutliningSpan(newFileName, fileName, i));
            }
            return result;
        }

        return lang.getOutliningSpans(fileName);
    }
}





