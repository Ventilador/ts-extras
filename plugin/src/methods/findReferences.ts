import { LanguageService, ReferencedSymbol } from "typescript/lib/tsserverlibrary";
import { Mappers } from "../mappers";

export function findReferencesFactory(lang: LanguageService, { mapReferencedSymbol, handles, movePosition, toRedirected, outOfBounds }: Mappers): LanguageService['findReferences'] {
    return function (fileName: string, position: number): ReferencedSymbol[] | undefined {
        if (handles(fileName)) {
            const newFileName = toRedirected(fileName);
            const newPosition = movePosition(fileName, newFileName, position);
            if (outOfBounds(fileName, newFileName, newPosition)) {
                return;
            }
            const result = lang.findReferences(newFileName, newPosition);
            if (result && result.length) {
                return result.map(i => mapReferencedSymbol(newFileName, fileName, i));
            }

            return result;
        }

        return lang.findReferences(fileName, position);
    }
}





