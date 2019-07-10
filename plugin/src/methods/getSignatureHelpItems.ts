import { LanguageService, SignatureHelpItems, SignatureHelpItemsOptions } from "typescript/lib/tsserverlibrary";
import { Mappers } from "./../mappers";
export function getSignatureHelpItemsFactory(
    lang: LanguageService,
    { handles, toRedirected, movePosition, mapSignatureHelpItems }: Mappers
): LanguageService['getSignatureHelpItems'] {
    return function (fileName: string, position: number, options: SignatureHelpItemsOptions | undefined): SignatureHelpItems | undefined {
debugger;        if (handles(fileName)) {
            const newFileName = toRedirected(fileName);
            const newPosition = movePosition(fileName, newFileName, position);
            const result = lang.getSignatureHelpItems(newFileName, newPosition, options);
            if (result) {
                return mapSignatureHelpItems(newFileName, fileName, result);
            }
            return result;
        }

        return lang.getSignatureHelpItems(fileName, position, options);
    }
}





