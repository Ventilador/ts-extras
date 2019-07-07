import { CombinedCodeActions, CombinedCodeFixScope, FormatCodeSettings, LanguageService, UserPreferences } from "typescript/lib/tsserverlibrary";
import { Mappers } from "../mappers";
export function getCombinedCodeFixFactory(
    lang: LanguageService,
    { handles, mapCombinedCodeFixScope, toRedirected, mapCombinedCodeActions }: Mappers
): LanguageService['getCombinedCodeFix'] {
    return function (scope: CombinedCodeFixScope, fixId: {}, formatOptions: FormatCodeSettings, preferences: UserPreferences): CombinedCodeActions {
        debugger;
        if (handles(scope.fileName)) {
            const newFileName = toRedirected(scope.fileName);
            scope = mapCombinedCodeFixScope(scope.fileName, newFileName, scope);

            const result = lang.getCombinedCodeFix(scope, fixId, formatOptions, preferences);
            if (result) {
                return mapCombinedCodeActions(newFileName, scope.fileName, result);
            }
        }

        return lang.getCombinedCodeFix(scope, fixId, formatOptions, preferences);
    }
}





