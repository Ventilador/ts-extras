import { server } from 'typescript/lib/tsserverlibrary'
export function performActionFactory({ languageService }: server.PluginCreateInfo) {
    return function performAction(action: string, args: any[], write: (err: any, response: Buffer | undefined) => void) {
        if (action in languageService) {
            write(null, languageService[action].apply(languageService, args));
            return;
        }


        write(`Not a valid action "${action}"`, undefined);
    };
}

export type ActionPerformer = (action: string, args: any[], write: (err: Error | undefined, response: Buffer) => void) => void;