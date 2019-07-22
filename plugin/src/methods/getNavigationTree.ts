import { LanguageService, NavigationTree } from "typescript/lib/tsserverlibrary";
import { Mappers } from "./../mappers";
export function getNavigationTreeFactory(
    lang: LanguageService,
    { handles, toRedirected, mapNavigationTree }: Mappers): LanguageService['getNavigationTree'] {
    return function (fileName: string): NavigationTree {
        if (handles(fileName)) {
            const newFileName = toRedirected(fileName);
            const result = lang.getNavigationTree(newFileName);
            if (result) {
                return mapNavigationTree(newFileName, fileName, result);
            }

            return result;
        }

        return lang.getNavigationTree(fileName);
    }
}





