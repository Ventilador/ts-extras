import { FileTextChanges, FormatCodeSettings, LanguageService, OrganizeImportsScope, UserPreferences } from "typescript/lib/tsserverlibrary";
import { Mappers } from "./../mappers";
export function organizeImportsFactory(
    lang: LanguageService,
    { handles, mapCombinedCodeFixScope, toRedirected, mapFileTextChanges }: Mappers,
): LanguageService['organizeImports'] {
    return function (scope: OrganizeImportsScope, formatOptions: FormatCodeSettings, preferences: UserPreferences | undefined): ReadonlyArray<FileTextChanges> {
        if (handles(scope.fileName)) {
            const newFileName = toRedirected(scope.fileName);
            scope = mapCombinedCodeFixScope(scope.fileName, newFileName, scope);
            const result = lang.organizeImports(scope, formatOptions, preferences);

            if (result.length) {
                return result.map(i => mapFileTextChanges(newFileName, scope.fileName, i));
            }
            return result;
        }

        return lang.organizeImports(scope, formatOptions, preferences);
    }
}





