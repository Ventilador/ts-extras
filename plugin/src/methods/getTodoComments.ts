import { LanguageService, TodoComment, TodoCommentDescriptor } from "typescript/lib/tsserverlibrary";
import { Utils, UtilsSync } from "./../tsUtils";
import { Mappers } from "./../mappers";
export function getTodoCommentsFactory
    (lang: LanguageService,
        { isVueFile, synchronize, toTsFile, calculatePosition }: UtilsSync,
        { outTodoComment }: Mappers): LanguageService['getTodoComments'] {
    return function (fileName: string, descriptors: TodoCommentDescriptor[]): TodoComment[] {
        debugger;
        if (isVueFile(fileName)) {
            synchronize();
            const result = lang.getTodoComments(toTsFile(fileName), descriptors);
            if (result.length) {
                return result.map(outTodoComment, fileName);
            }
            return result;
        }

        return lang.getTodoComments(fileName, descriptors);
    }
}





