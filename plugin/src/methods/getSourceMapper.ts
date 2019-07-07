import { LanguageService, SourceFile } from "typescript/lib/tsserverlibrary";
import { Utils } from "./../tsUtils";
import { Mappers } from "./../mappers";
export function getSourceMapperFactory(lang: LanguageService, _: Utils, __: Mappers): (file: string) => SourceFile {
    return (lang as any).getSourceMapper
}





