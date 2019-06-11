import { server, LanguageService } from 'typescript/lib/tsserverlibrary';
export default function () {
    return { create };
    function create({ languageService, config, languageServiceHost, project, serverHost }: server.PluginCreateInfo): LanguageService {
        return languageService;
    }
}


