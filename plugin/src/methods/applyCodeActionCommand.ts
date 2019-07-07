import { LanguageService } from "typescript/lib/tsserverlibrary";
import { Mappers } from "./../mappers";
export function applyCodeActionCommandFactory(lang: LanguageService, __: Mappers): LanguageService['applyCodeActionCommand'] {
    return function (): Promise<any> {
        console.trace(arguments);
        return lang.applyCodeActionCommand.apply(lang, arguments as any);
    }
}





