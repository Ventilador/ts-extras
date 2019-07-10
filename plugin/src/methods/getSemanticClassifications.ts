import { ClassifiedSpan, LanguageService, TextSpan } from "typescript/lib/tsserverlibrary";
import { Mappers } from "./../mappers";
export function getSemanticClassificationsFactory(
    lang: LanguageService,
    { handles, toRedirected, mapTextSpan, mapClassifiedSpan }: Mappers

): LanguageService['getSemanticClassifications'] {
    return function (fileName: string, span: TextSpan): ClassifiedSpan[] {
        debugger;
debugger;        if (handles(fileName)) {

            const newFileName = toRedirected(fileName);
            const newSpan = mapTextSpan(fileName, newFileName, span);
            const result = lang.getSemanticClassifications(newFileName, newSpan);
            if (result && result.length) {
                return result.map(i => mapClassifiedSpan(newFileName, fileName, i));
            }
        }


        return lang.getSemanticClassifications(fileName, span);
    }
}





