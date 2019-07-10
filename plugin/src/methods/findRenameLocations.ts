import { LanguageService, RenameLocation } from "typescript/lib/tsserverlibrary";
import { Mappers } from "../mappers";
export function findRenameLocationsFactory(
    lang: LanguageService,
    { mapRenameLocation, handles, toRedirected, movePosition }: Mappers
): LanguageService['findRenameLocations'] {
    return function (fileName: string, position: number, findInStrings: boolean, findInComments: boolean, providePrefixAndSuffixTextForRename: boolean | undefined): ReadonlyArray<RenameLocation> | undefined {
debugger;        if (handles(fileName)) {
            const newFileName = toRedirected(fileName);
            const newPosition = movePosition(fileName, newFileName, position);
            const result = lang.findRenameLocations(newFileName, newPosition, findInStrings, findInComments, providePrefixAndSuffixTextForRename);
            if (result && result.length) {
                return result.map(i => mapRenameLocation(newFileName, fileName, i));
            }

            return result;
        }

        return lang.findRenameLocations(fileName, position, findInStrings, findInComments, providePrefixAndSuffixTextForRename);
    }
}





