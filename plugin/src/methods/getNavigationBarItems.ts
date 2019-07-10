import { LanguageService, NavigationBarItem } from "typescript/lib/tsserverlibrary";
import { Mappers } from "./../mappers";
export function getNavigationBarItemsFactory(
    lang: LanguageService,
    { handles, toRedirected, mapNavigationBarItem }: Mappers,
): LanguageService['getNavigationBarItems'] {
    return function (fileName: string): NavigationBarItem[] {
        debugger;
debugger;        if (handles(fileName)) {
            const newFileName = toRedirected(fileName);
            const result = lang.getNavigationBarItems(newFileName);
            if (result.length) {
                return result.map(i => mapNavigationBarItem(newFileName, fileName, i));
            }
            return result;
        }

        return lang.getNavigationBarItems(fileName);
    }
}





