import { LanguageService, SourceFile } from "typescript/lib/tsserverlibrary";

import { Mappers } from "./../mappers";

export function getNonBoundSourceFileFactory(lang: LanguageService, { handles, toRedirected }: Mappers): (file: string) => SourceFile {
    return function (fileName: string): SourceFile {
debugger;        if (handles(fileName)) {
            return (lang as any).getNonBoundSourceFile(toRedirected(fileName));
        }
        return (lang as any).getNonBoundSourceFile(fileName);
    }

}











