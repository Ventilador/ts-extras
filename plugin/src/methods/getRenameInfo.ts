import { LanguageService, RenameInfo, RenameInfoOptions } from "typescript/lib/tsserverlibrary";
import { UtilsSync } from "./../tsUtils";
import { Mappers } from "./../mappers";
export function getRenameInfoFactory(
    lang: LanguageService,
    { isVueFile, synchronize, toTsFile, calculatePosition }: UtilsSync,
    { outRenameInfo }: Mappers
): LanguageService['getRenameInfo'] {
    return function (fileName: string, position: number, options: RenameInfoOptions | undefined): RenameInfo {
        if (isVueFile(fileName)) {
            synchronize();
            const newFileName = toTsFile(fileName);
            const newPosition = calculatePosition({ from: fileName, to: toTsFile(fileName) }, position);
            const result = lang.getRenameInfo(newFileName, newPosition, options);
            if (result) {
                return outRenameInfo(fileName, result);
            }

            return result;
        }

        return lang.getRenameInfo(fileName, position, options);
    }
}





