import { ClassifiedSpan, LanguageService, TextSpan } from "typescript/lib/tsserverlibrary";
import { UtilsSync } from "./../tsUtils";
import { Mappers } from "./../mappers";
export function getSemanticClassificationsFactory(
    lang: LanguageService,
    { isVueFile, synchronize, toTsFile, calculatePosition }: UtilsSync,
    { inTextSpan, outClassifiedSpan }: Mappers

): LanguageService['getSemanticClassifications'] {
    return function (fileName: string, span: TextSpan): ClassifiedSpan[] {
        debugger;
        if (isVueFile(fileName)) {
            synchronize();
            const newFileName = toTsFile(fileName);
            const newSpan = inTextSpan(fileName, span);
            const result = lang.getSemanticClassifications(newFileName, newSpan);
            if (result && result.length) {
                return result.map(outClassifiedSpan, fileName);
            }
        }


        return lang.getSemanticClassifications(fileName, span);
    }
}





