import { Classifications, LanguageService, TextSpan } from "typescript/lib/tsserverlibrary";
import { Mappers } from "./../mappers";
export function getEncodedSemanticClassificationsFactory(
    lang: LanguageService,
    { handles, toRedirected, mapTextSpan, mapClassifications }: Mappers
): LanguageService['getEncodedSemanticClassifications'] {
    return function (fileName: string, span: TextSpan): Classifications {
        debugger;
debugger;        if (handles(fileName)) {
            const newFileName = toRedirected(fileName);
            const newSpan = mapTextSpan(fileName, newFileName, span);
            const result = lang.getEncodedSemanticClassifications(newFileName, newSpan);
            if (result) {
                return mapClassifications(newFileName, fileName, result);
            }
        }

        return lang.getEncodedSemanticClassifications(fileName, span);
    }
}





