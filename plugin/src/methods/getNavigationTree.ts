import { LanguageService, NavigationTree } from "typescript/lib/tsserverlibrary";
import { UtilsSync } from "./../tsUtils";
import { Mappers } from "./../mappers";
export function getNavigationTreeFactory(
    lang: LanguageService,
    { isVueFile, synchronize, toTsFile }: UtilsSync,
    { outNavigationTree }: Mappers): LanguageService['getNavigationTree'] {
    return function (fileName: string): NavigationTree {
        if (isVueFile(fileName)) {
            synchronize();
            const result = lang.getNavigationTree(toTsFile(fileName));
            if (result) {
                return outNavigationTree(fileName, result);
            }

            return result;
        }

        return lang.getNavigationTree(fileName);
    }
}





