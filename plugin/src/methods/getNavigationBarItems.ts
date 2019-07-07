import { LanguageService, NavigationBarItem } from "typescript/lib/tsserverlibrary";
import { UtilsSync } from "./../tsUtils";
import { Mappers } from "./../mappers";
export function getNavigationBarItemsFactory(
    lang: LanguageService,
    { isVueFile, synchronize, toTsFile }: UtilsSync,
    { outNavigationBarItem }: Mappers,
): LanguageService['getNavigationBarItems'] {
    return function (fileName: string): NavigationBarItem[] {
        debugger;
        if (isVueFile(fileName)) {
            synchronize();
            const result = lang.getNavigationBarItems(toTsFile(fileName));
            if (result.length) {
                return result.map(outNavigationBarItem, fileName);
            }
            return result;
        }

        return lang.getNavigationBarItems(fileName);
    }
}





