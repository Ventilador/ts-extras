import { LanguageService, SignatureHelpItems, SignatureHelpItemsOptions } from "typescript/lib/tsserverlibrary";
import { UtilsSync } from "./../tsUtils";
import { Mappers } from "./../mappers";
export function getSignatureHelpItemsFactory(
    lang: LanguageService,
    { isVueFile, synchronize, toTsFile, calculatePosition }: UtilsSync,
    { outSignatureHelpItems }: Mappers
): LanguageService['getSignatureHelpItems'] {
    return function (fileName: string, position: number, options: SignatureHelpItemsOptions | undefined): SignatureHelpItems | undefined {
        if (isVueFile(fileName)) {
            synchronize();
            const newFileName = toTsFile(fileName);
            const newPosition = calculatePosition({ from: fileName, to: toTsFile(fileName) }, position);
            const result = lang.getSignatureHelpItems(newFileName, newPosition, options);
            if (result) {
                return outSignatureHelpItems(newFileName, result);
            }
            return result;
        }

        return lang.getSignatureHelpItems(fileName, position, options);
    }
}





