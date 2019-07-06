import { loaders } from '@ts-extras/types';
type MappingFileInfo = loaders.MappingFileInfo;
export function createMappedFile(originalPath: string, ext: string, originalContent: string, parser: (content: string) => MappingFileInfo): loaders.MappedFile {
    let fileInfo: MappingFileInfo | undefined;
    return {
        getContentToRead,
        getContentToWrite,
        originalPath,
        fullPath: originalPath + ext,
    };
    function getContentToRead(): string {
        ensureContent();
        return fileInfo!.newText;
    }
    function getContentToWrite(): string {
        ensureContent();
        const { newText, span } = fileInfo!;
        return originalContent.slice(0, span.start) + newText + originalContent.slice(span.start + span.length, originalContent.length);
    }
    function ensureContent() {
        if (fileInfo) {
            return;
        }
        fileInfo = parser(originalContent);
    }
}
