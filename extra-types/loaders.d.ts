import { TextRange, FileTextChanges, TextChange, } from 'typescript';
export namespace loaders {
	export type AugPackageJson = {
		tsLoaders: PackageJsonConfigPath | PackageJsonConfigPath[];
	}
	export type WriteFileCallback = (fileName: string, data: string) => any;
	export type PackageJsonConfigPath = string;
	export type LoaderObject = {
		extension: string;
		parse: (fileName: string, content: string) => MappingFileInfo;
		redirect?: Redirector;
		emit?: (fileName: string, result: EmitResult, writeFile: WriteFileCallback) => any;
	}
	export type Redirector = (file: string, addRedirectedFile: PushFile) => true | false | undefined;
	export type PushFile = (from: string, to: string) => void;
	export type ParseContent = (content: string) => TextChange;
	export type LoaderFileExport = {
		default: LoaderExport;
	}
	export type LoaderExport = LoaderObject;
	export type EmitResult = {
		getDTs(): string;
		getJs(): string;
		getMap(): string;
		getDTsMap(): string;
		outDir: string;
		fileName: string;
		info: MappingFileInfo;
	}

	export type Loader = {
		extension: string;
		multiFile: false;
		emit: (fileName: string, result: Pick<loaders.EmitResult, "getDTs" | "getJs" | "getMap" | "getDTsMap" | "fileName" | "outDir">, writeFile: WriteFileCallback) => any;
        /**
         *
         * @param fileName originating file path
         * @param content original content
         */
		readContent: (from: string, to: string, content: string) => string;
        /**
         * @returns originating file path
         */
		getDTsSourceMapFileName: (fileName: string) => string | false;
        /**
         * @returns originating file path
         */
		getSourceMapFileName: (fileName: string) => string | false;
        /**
         * @returns originating file path
         */
		getDefinitionOutputFileName: (fileName: string) => string | false;
        /**
         * @returns originating file path
         */
		getJsOutputFileName: (fileName: string) => string | false;
		wasRedirected: (fileName: string) => string | false;
        /**
         * @returns whether the loader supports the file
         */
		handles: (fileName: string) => boolean;
        /**
         * @param fileName full path of the file being processed
         * @param addFile add new files to the program
         * @returns true if the file was handled and you dont want to the default loader to do any work
         *          false or undefined, to let the default loader load the file for you
         *          you can also add files, and return false|undefined, to let the default file be loaded as well (not exclusive behavior)
         */
		redirect: (fileName: string, addFile: (from: string, to: string) => void) => true | false | undefined;
	}
	export type MappedFile = {
		readonly originalPath: string;
		readonly fullPath: string;
		getContentToRead: () => string;
		getContentToWrite: () => string;
	}
	export type MappingFileInfo = TextChange & { oldText: string };
}