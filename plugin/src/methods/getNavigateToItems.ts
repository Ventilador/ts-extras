import { LanguageService, NavigateToItem } from "typescript/lib/tsserverlibrary";
import { UtilsSync } from "./../tsUtils";
import { Mappers } from "./../mappers";
export function getNavigateToItemsFactory(
    lang: LanguageService,
    { isVueFile, toTsFile, }: UtilsSync,
    { outNavigateToItem }: Mappers
): LanguageService['getNavigateToItems'] {
    return function (searchValue: string, maxResultCount: number | undefined, fileName: string | undefined, excludeDtsFiles: boolean | undefined): NavigateToItem[] {
        debugger;
        if (fileName && isVueFile(fileName)) {
            const newFile = toTsFile(fileName);
            const result = lang.getNavigateToItems(searchValue, maxResultCount, newFile, excludeDtsFiles);
            if (result.length) {
                return result.map(outNavigateToItem, fileName);
            }

            return result;
        }

        return lang.getNavigateToItems(searchValue, maxResultCount, fileName, excludeDtsFiles);
    }
}





