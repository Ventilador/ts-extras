import { LanguageService, TodoComment, TodoCommentDescriptor } from "typescript/lib/tsserverlibrary";
import { Mappers } from "./../mappers";
export function getTodoCommentsFactory
    (lang: LanguageService,
        { handles, toRedirected, mapTodoComment }: Mappers): LanguageService['getTodoComments'] {
    return function (fileName: string, descriptors: TodoCommentDescriptor[]): TodoComment[] {
        debugger;
debugger;        if (handles(fileName)) {
            const newFileName = toRedirected(fileName);
            const result = lang.getTodoComments(newFileName, descriptors);
            if (result.length) {
                return result.map(i => mapTodoComment(newFileName, fileName, i));
            }
            return result;
        }

        return lang.getTodoComments(fileName, descriptors);
    }
}





