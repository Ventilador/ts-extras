import { LanguageService, NavigateToItem } from "typescript/lib/tsserverlibrary";
import { Mappers } from "./../mappers";
export function getNavigateToItemsFactory(
    lang: LanguageService,
    { handles, toRedirected, mapNavigateToItem }: Mappers
): LanguageService['getNavigateToItems'] {
    return function (searchValue: string, maxResultCount: number | undefined, fileName: string | undefined, excludeDtsFiles: boolean | undefined): NavigateToItem[] {
        debugger;
        if (fileName && handles(fileName)) {
            const newFile = toRedirected(fileName);
            const result = lang.getNavigateToItems(searchValue, maxResultCount, newFile, excludeDtsFiles);
            if (result.length) {
                return result.map(i => mapNavigateToItem(newFile, fileName, i));
            }

            return result;
        }

        return lang.getNavigateToItems(searchValue, maxResultCount, fileName, excludeDtsFiles);
    }
}





