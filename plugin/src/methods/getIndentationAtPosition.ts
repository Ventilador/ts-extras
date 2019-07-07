import { EditorOptions, EditorSettings, LanguageService } from "typescript/lib/tsserverlibrary";
import { UtilsSync } from "./../tsUtils";
import { Mappers } from "./../mappers";
export function getIndentationAtPositionFactory(lang: LanguageService, { isVueFile, synchronize, toTsFile, calculatePosition }: UtilsSync, _: Mappers): LanguageService['getIndentationAtPosition'] {
    return function (fileName: string, position: number, options: EditorOptions | EditorSettings): number {
        debugger;
        if (isVueFile(fileName)) {
            synchronize();
            const newFileName = toTsFile(fileName);
            const newPosition = calculatePosition({ from: fileName, to: toTsFile(fileName) }, position);
            const result = lang.getIndentationAtPosition(newFileName, newPosition, options);

            return result;
        }

        return lang.getIndentationAtPosition(fileName, position, options);
    }
}





