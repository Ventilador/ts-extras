import { ClassifiedSpan, LanguageService, TextSpan } from "typescript/lib/tsserverlibrary";
import { Mappers } from "./../mappers";
export function getSyntacticClassificationsFactory(
    lang: LanguageService,
    { handles, toRedirected, mapTextSpan, mapClassifiedSpan }: Mappers
): LanguageService['getSyntacticClassifications'] {
    return function (fileName: string, span: TextSpan): ClassifiedSpan[] {
        debugger;
debugger;        if (handles(fileName)) {

            const newFileName = toRedirected(fileName);
            const newSpan = mapTextSpan(fileName, newFileName, span);
            const result = lang.getSyntacticClassifications(newFileName, newSpan);
            if (result.length) {
                return result.map(i => mapClassifiedSpan(newFileName, fileName, i));
            }
        }

        return lang.getSyntacticClassifications(fileName, span);
    }
}





