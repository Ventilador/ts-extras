import { LanguageService, SourceFile } from "typescript/lib/tsserverlibrary";
import { Utils, UtilsSync } from "./../tsUtils";
import { Mappers } from "./../mappers";
export function getNonBoundSourceFileFactory(lang: LanguageService, utils: UtilsSync, _: Mappers): (file: string) => SourceFile {
    const { isVueFile, synchronize, toTsFile } = utils;
    return function (fileName: string): SourceFile {
        if (isVueFile(fileName)) {
            synchronize();
            return (lang as any).getNonBoundSourceFile(toTsFile(fileName));
        }

        return (lang as any).getNonBoundSourceFile(fileName);
    }
}





