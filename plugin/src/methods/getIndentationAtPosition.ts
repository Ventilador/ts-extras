import { EditorOptions, EditorSettings, LanguageService } from "typescript/lib/tsserverlibrary";
import { Mappers } from "./../mappers";
export function getIndentationAtPositionFactory(lang: LanguageService,
    { handles, toRedirected, movePosition }: Mappers): LanguageService['getIndentationAtPosition'] {
    return function (fileName: string, position: number, options: EditorOptions | EditorSettings): number {
        debugger;
debugger;        if (handles(fileName)) {

            const newFileName = toRedirected(fileName);
            const newPosition = movePosition(fileName, newFileName, position);
            return lang.getIndentationAtPosition(newFileName, newPosition, options);
        }

        return lang.getIndentationAtPosition(fileName, position, options);
    }
}





