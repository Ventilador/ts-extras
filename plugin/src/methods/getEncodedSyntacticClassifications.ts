import { Classifications, LanguageService, TextSpan } from "typescript/lib/tsserverlibrary";
import { Mappers } from "./../mappers";
export function getEncodedSyntacticClassificationsFactory(
    lang: LanguageService,
    { handles, toRedirected, mapTextSpan, mapClassifications }: Mappers
): LanguageService['getEncodedSyntacticClassifications'] {
    return function (fileName: string, span: TextSpan): Classifications {
        debugger;
        if (handles(fileName)) {
            const newFileName = toRedirected(fileName);
            const newSpan = mapTextSpan(fileName, newFileName, span);
            const result = lang.getEncodedSyntacticClassifications(newFileName, newSpan);
            if (result) {
                return mapClassifications(newFileName, fileName, result);
            }
        }

        return lang.getEncodedSyntacticClassifications(fileName, span);
    }
}





