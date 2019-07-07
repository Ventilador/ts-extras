import { ClassifiedSpan, LanguageService, TextSpan } from "typescript/lib/tsserverlibrary";
import { UtilsSync } from "./../tsUtils";
import { Mappers } from "./../mappers";
export function getSyntacticClassificationsFactory(
    lang: LanguageService,
    { isVueFile, synchronize, toTsFile }: UtilsSync,
    { inTextSpan, outClassifiedSpan }: Mappers
): LanguageService['getSyntacticClassifications'] {
    return function (fileName: string, span: TextSpan): ClassifiedSpan[] {
        debugger;
        if (isVueFile(fileName)) {
            synchronize();
            const newFileName = toTsFile(fileName);
            const newSpan = inTextSpan(fileName, span);
            const result = lang.getSyntacticClassifications(newFileName, newSpan);
            if (result.length) {
                return result.map(outClassifiedSpan, fileName);
            }
        }

        return lang.getSyntacticClassifications(fileName, span);
    }
}





