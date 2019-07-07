import { FileTextChanges, FormatCodeSettings, LanguageService, OrganizeImportsScope, UserPreferences } from "typescript/lib/tsserverlibrary";
import { UtilsSync } from "./../tsUtils";
import { Mappers } from "./../mappers";
export function organizeImportsFactory(
    lang: LanguageService,
    { isVueFile, synchronize }: UtilsSync,
    { inCombinedCodeFixScope, outFileTextChanges }: Mappers
): LanguageService['organizeImports'] {
    return function (scope: OrganizeImportsScope, formatOptions: FormatCodeSettings, preferences: UserPreferences | undefined): ReadonlyArray<FileTextChanges> {
        if (isVueFile(scope.fileName)) {
            synchronize();
            scope = inCombinedCodeFixScope(scope.fileName, scope);
            const result = lang.organizeImports(scope, formatOptions, preferences);

            if (result.length) {
                return result.map(outFileTextChanges, scope.fileName);
            }
            return result;
        }

        return lang.organizeImports(scope, formatOptions, preferences);
    }
}





