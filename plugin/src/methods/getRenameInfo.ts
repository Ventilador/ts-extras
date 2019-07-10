import { LanguageService, RenameInfo, RenameInfoOptions } from "typescript/lib/tsserverlibrary";
import { Mappers } from "./../mappers";
export function getRenameInfoFactory(
    lang: LanguageService,
    { handles, toRedirected, movePosition, mapRenameInfo }: Mappers
): LanguageService['getRenameInfo'] {
    return function (fileName: string, position: number, options: RenameInfoOptions | undefined): RenameInfo {
debugger;        if (handles(fileName)) {

            const newFileName = toRedirected(fileName);
            const newPosition = movePosition(fileName, newFileName, position);
            const result = lang.getRenameInfo(newFileName, newPosition, options);
            if (result) {
                return mapRenameInfo(newFileName, fileName, result);
            }

            return result;
        }

        return lang.getRenameInfo(fileName, position, options);
    }
}





