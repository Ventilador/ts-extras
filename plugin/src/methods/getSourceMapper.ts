import { LanguageService, SourceFile } from "typescript/lib/tsserverlibrary";

import { Mappers } from "./../mappers";

export function getSourceMapperFactory(lang: LanguageService, _: Mappers): (file: string) => SourceFile {
    return (lang as any).getSourceMapper
}






