import { TextRange, FileTextChanges, TextChange, LineAndCharacter, Program } from 'typescript';
export namespace loaders {
	export type AugPackageJson = {
		tsLoaders: PackageJsonConfigPath | PackageJsonConfigPath[];
	}

	export type Cache = {
		get: (from: string, to: string, content?: string) => loaders.MappedFileInfo;
	}

	export type WriteFileCallback = (fileName: string, data: string) => any;
	export type PackageJsonConfigPath = string;
	export type LoaderObject = {
		extension: string;
		after?: (currentProgram: Program) => void;
		parse: (fileName: string, to: string, content: string) => MappingFileInfo;
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
		info: MappedFileInfo;
	}

	export type BaseLoader = {
		dirname: string;
		extension: string;

		multiFile: false;
		/**
		 * Optional callback to do some work after a program finished emitting files
		 * @param currentProgram current program
		 */
		after?: (currentProgram: Program) => any;
		/**
		 * @param fileName file path to parse
		 * @param to file path of the newly parsed file
		 * @param content content of the file
	     * @returns the parse result
	     */
		parse: (fileName: string, to: string, content: string) => loaders.MappedFileInfo;
		/**
		 * @param fileName file path to redirect
	     * @returns the file converted to typescript extension
	     */
		toRedirected: (fileName: string) => string;
		/**
		 * @param fileName file path to check
	     * @returns whether the loader supports the file
	     */
		handles: (fileName: string) => boolean;
		/**
		 * @param fileName file path to check
		 * @returns a string, with the originating file name, or false, if it was not redirected
		 */
		wasRedirected: (fileName: string) => string | false;
		/**
		* @param fileName full path of the file being processed
		* @param addFile add new files to the program
		* @returns true if the file was handled and you dont want to the default loader to do any work
		*          false or undefined, to let the default loader load the file for you
		*          you can also add files, and return false|undefined, to let the default file be loaded as well (not exclusive behavior)
		*/
		redirect: (fileName: string, addFile: (from: string, to: string) => void) => true | false | undefined;
		/**
		 * Can be used to get the originating filename of a js, or d.ts file, as well as custom new extensions
		 * @param ext file extension
		 * @param fileName file path to check
		 * @returns a string, with the originating file name, or false, if it was not redirected
		 */
		wasRedirectedFrom: (ext: TypescriptExtension | string, fileName: string) => string | false;
	}

	export const enum TypescriptExtension {
		TS = ".ts",
		TSX = ".tsx",
		DTS = ".d.ts",
		JS = ".js",
		JSX = ".jsx",
		MAP = ".js.map",
		DTSMAP = ".d.ts.map",
	}

	export type CompilerLoader = {
		/**
		 * @param fileName originating file path
         * @param result typescript emitted value
		 * @param writeFile writer function to write files to disk
		 */
		emit: (fileName: string, result: Pick<loaders.EmitResult, "getDTs" | "getJs" | "getMap" | "getDTsMap" | "fileName" | "outDir">, writeFile: WriteFileCallback) => any;
		/**
         *
         * @param fileName originating file path
         * @param content original content
         */
		readContent: (from: string, to: string, content: string) => string;
	} & BaseLoader;

	export type ServerLoader = {
		movePosition: (from: string, to: string, pos: number) => number;
		moveFile: (from: string, to: string, fileName: string) => string;
		moveLineAndChar: (from: string, to: string, fileName: LineAndCharacter) => LineAndCharacter;
		movePositionWithinFile: (from: string, to: string, pos: number) => number;
		outOfBounds(from: string, to: string, pos: number | TextRange): boolean;
	} & BaseLoader;
	export type MappedFile = {
		readonly originalPath: string;
		readonly fullPath: string;
		getContentToRead: () => string;
		getContentToWrite: () => string;
	}
	export type MappedFileInfo = {
		newText: string;
		oldText: string;
		start: number;
		end: number;
		length: number;
	}
	export type MappingFileInfo = MapFileByTextChange;
	export type MapFileByTextSpan = TextRange;
	export type MapFileByTextChange = TextChange & { oldText: string };
}