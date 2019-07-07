import { CompletionInfo, GetCompletionsAtPositionOptions, LanguageService, WithMetadata } from "typescript/lib/tsserverlibrary";
import { Mappers } from "./../mappers";
export function getCompletionsAtPositionFactory(
    lang: LanguageService,
    { handles, toRedirected, movePosition, mapWithMetadataCompletionInfo }: Mappers
): LanguageService['getCompletionsAtPosition'] {
    return function (fileName: string, position: number, options: GetCompletionsAtPositionOptions | undefined): WithMetadata<CompletionInfo> | undefined {
        if (handles(fileName)) {
            const newFileName = toRedirected(fileName);
            const newPosition = movePosition(fileName, newFileName, position);
            const result = lang.getCompletionsAtPosition(newFileName, newPosition, options);
            if (result) {
                return mapWithMetadataCompletionInfo(newFileName, fileName, result);
            }
            return result;
        }

        return lang.getCompletionsAtPosition(fileName, position, options);
    }
}





