import *as ts from 'typescript/lib/tsserverlibrary';
import { Returns, Method, } from '@ts-extras/serialization';
import { DiagnosticWithLocation } from './serialization/diagnosticWithLocation';
import { Diagnostic } from './serialization/diagnostic';
import { ClassifiedSpan } from './serialization/classifiedSpan';
import { TextSpan } from './serialization/textSpan';
import { Classifications } from './serialization/classifications';
import { WithMetadataCompletionInfo } from './serialization/withMetadata';
import { GetCompletionsAtPositionOptions } from './serialization/getCompletionsAtPositionOptions';
import { CompletionEntryDetails } from './serialization/completionEntryDetails';
import { FormatCodeOptions } from './serialization/formatCodeOptions';
import { UserPreferences } from './serialization/userPreferences';
import { QuickInfo } from './serialization/quickInfo';
import { SignatureHelpItems } from './serialization/signatureHelpItems';
import { RenameInfo } from './serialization/renameInfo';
import { RenameInfoOptions } from './serialization/renameInfoOptions';
import { RenameLocation } from './serialization/renameLocation';
import { SelectionRange } from './serialization/selectionRange';
import { DefinitionInfo } from './serialization/definitionInfo';
import { DefinitionInfoAndBoundSpan } from './serialization/definitionInfoAndBoundSpan';
import { ImplementationLocation } from './serialization/implementationLocation';
import { ReferenceEntry } from './serialization/referenceEntry';
import { ReferencedSymbol } from './serialization/referencedSymbol';
import { DocumentHighlights } from './serialization/documentHighlights';
import { NavigationBarItem } from './serialization/navigationBarItem';
import { NavigationTree } from './serialization/navigationTree';
import { OutliningSpan } from './serialization/outliningSpan';
import { TodoComment } from './serialization/todoComment';
import { TodoCommentDescriptor } from './serialization/todoCommentDescriptor';
import { EditorOptions } from './serialization/EditorOptionsOrSettings';
import { TextChange } from './serialization/textChange';
import { TextInsertion } from './serialization/textInsertion';
import { JsxClosingTagInfo } from './serialization/jsxClosingTagInfo';
import { LineAndCharacter } from './serialization/lineAndCharacter';
import { CodeFixAction } from './serialization/codeFixAction';
import { FormatCodeSettings } from './serialization';
import { CombinedCodeActions } from './serialization/combinedCodeActions';
import { CombinedCodeFixScope } from './serialization/combinedCodeFixScope';
import { ApplyCodeActionCommandResult } from './serialization/applyCodeActionCommandResult';
import { ApplicableRefactorInfo } from './serialization/applicableRefactorInfo';
import { RefactorEditInfo } from './serialization/refactorEditInfo';
import { FileTextChanges } from './serialization/fileTextChanges';
import { EmitOutput } from './serialization/emitOutput';
import { Metadata } from '@ts-extras/serialization';
import { SignatureHelpItemsOptions } from './serialization/signatureHelpItemsOptions';
import { NavigateToItem } from './serialization/navigateToItem';
import { TextRange } from './serialization/textRange';

export class LanguageServerAsync implements ILanguageServiceAsync {
    public static Metadata: Metadata;

    @Returns()
    @Method()
    cleanupSemanticCache(): void | Promise<void> {
        throw new Error("Method not implemented.");
    }

    @Returns(DiagnosticWithLocation)
    @Method(String)
    getSyntacticDiagnostics(fileName: string): Promise<DiagnosticWithLocation[]> {
        throw new Error("Method not implemented.");
    }

    @Returns([Diagnostic])
    @Method(String)
    getSemanticDiagnostics(fileName: string): Promise<Diagnostic[]> {
        throw new Error("Method not implemented.");
    }

    @Returns([DiagnosticWithLocation])
    @Method(String)
    getSuggestionDiagnostics(fileName: string): Promise<DiagnosticWithLocation[]> {
        throw new Error("Method not implemented.");
    }

    @Returns([Diagnostic])
    @Method()
    getCompilerOptionsDiagnostics(): Promise<Diagnostic[]> {
        throw new Error("Method not implemented.");
    }

    @Returns([ClassifiedSpan])
    @Method(String, TextSpan)
    getSyntacticClassifications(fileName: string, span: TextSpan): Promise<ClassifiedSpan[]> {
        throw new Error("Method not implemented.");
    }

    @Returns([ClassifiedSpan])
    @Method(String, TextSpan)
    getSemanticClassifications(fileName: string, span: TextSpan): Promise<ClassifiedSpan[]> {
        throw new Error("Method not implemented.");
    }

    @Returns([Classifications])
    @Method(String, TextSpan)
    getEncodedSyntacticClassifications(fileName: string, span: TextSpan): Promise<Classifications> {
        throw new Error("Method not implemented.");
    }

    @Returns([Classifications])
    @Method(String, TextSpan)
    getEncodedSemanticClassifications(fileName: string, span: TextSpan): Promise<Classifications> {
        throw new Error("Method not implemented.");
    }

    @Returns(WithMetadataCompletionInfo)
    @Method(String, Number, GetCompletionsAtPositionOptions)
    getCompletionsAtPosition(fileName: string, position: number, options: GetCompletionsAtPositionOptions): Promise<ts.WithMetadata<ts.CompletionInfo>> {
        throw new Error("Method not implemented.");
    }

    @Returns(CompletionEntryDetails)
    @Method(String, Number, String, FormatCodeSettings, String, UserPreferences)
    getCompletionEntryDetails(fileName: string, position: number, name: string, formatOptions: /*ts.FormatCodeOptions*/ | FormatCodeSettings, source: string, preferences: UserPreferences): Promise<CompletionEntryDetails> {
        throw new Error("Method not implemented.");
    }

    @Returns(QuickInfo)
    @Method(String, Number)
    getQuickInfoAtPosition(fileName: string, position: number): Promise<QuickInfo> {
        throw new Error("Method not implemented.");
    }

    @Returns(TextSpan)
    @Method(String, Number, Number)
    getNameOrDottedNameSpan(fileName: string, startPos: number, endPos: number): Promise<TextSpan> {
        throw new Error("Method not implemented.");
    }

    @Returns(TextSpan)
    @Method(String, Number)
    getBreakpointStatementAtPosition(fileName: string, position: number): TextSpan | Promise<TextSpan> {
        throw new Error("Method not implemented.");
    }

    @Returns(SignatureHelpItems)
    @Method(String, Number, SignatureHelpItemsOptions)
    getSignatureHelpItems(fileName: string, position: number, options: SignatureHelpItemsOptions): Promise<SignatureHelpItems> {
        throw new Error("Method not implemented.");
    }

    @Returns(RenameInfo)
    @Method(String, Number, RenameInfoOptions)
    getRenameInfo(fileName: string, position: number, options?: RenameInfoOptions): Promise<RenameInfo> {
        throw new Error("Method not implemented.");
    }

    @Returns([RenameLocation])
    @Method(String, Number, Boolean, Boolean, Boolean)
    findRenameLocations(fileName: string, position: number, findInStrings: boolean, findInComments: boolean, providePrefixAndSuffixTextForRename?: boolean): Promise<RenameLocation[]> {
        throw new Error("Method not implemented.");
    }

    @Returns(SelectionRange)
    @Method(String, Number)
    getSmartSelectionRange(fileName: string, position: number): Promise<SelectionRange> {
        throw new Error("Method not implemented.");
    }

    @Returns([DefinitionInfo])
    @Method(String, Number)
    getDefinitionAtPosition(fileName: string, position: number): Promise<readonly DefinitionInfo[]> {
        throw new Error("Method not implemented.");
    }

    @Returns([DefinitionInfoAndBoundSpan])
    @Method(String, Number)
    getDefinitionAndBoundSpan(fileName: string, position: number): Promise<DefinitionInfoAndBoundSpan> {
        throw new Error("Method not implemented.");
    }

    @Returns([DefinitionInfo])
    @Method(String, Number)
    getTypeDefinitionAtPosition(fileName: string, position: number): Promise<readonly DefinitionInfo[]> {
        throw new Error("Method not implemented.");
    }

    @Returns([ImplementationLocation])
    @Method(String, Number)
    getImplementationAtPosition(fileName: string, position: number): Promise<readonly ImplementationLocation[]> {
        throw new Error("Method not implemented.");
    }

    @Returns([ReferenceEntry])
    @Method(String, Number)
    getReferencesAtPosition(fileName: string, position: number): Promise<ReferenceEntry[]> {
        throw new Error("Method not implemented.");
    }

    @Returns([ReferencedSymbol])
    @Method(String, Number)
    findReferences(fileName: string, position: number): Promise<ReferencedSymbol[]> {
        throw new Error("Method not implemented.");
    }

    @Returns([DocumentHighlights])
    @Method(String, Number, [String])
    getDocumentHighlights(fileName: string, position: number, filesToSearch: string[]): Promise<DocumentHighlights[]> {
        throw new Error("Method not implemented.");
    }

    @Returns([ReferenceEntry])
    @Method(String, Number)
    getOccurrencesAtPosition(fileName: string, position: number): Promise<readonly ReferenceEntry[]> {
        throw new Error("Method not implemented.");
    }

    @Returns([DocumentHighlights])
    @Method(String, Number, String, Boolean)
    getNavigateToItems(searchValue: string, maxResultCount?: number, fileName?: string, excludeDtsFiles?: TextRange): Promise<NavigateToItem[]> {
        throw new Error("Method not implemented.");
    }

    @Returns([NavigationBarItem])
    @Method(String)
    getNavigationBarItems(fileName: string): Promise<NavigationBarItem[]> {
        throw new Error("Method not implemented.");
    }

    @Returns(NavigationTree)
    @Method(String)
    getNavigationTree(fileName: string): Promise<NavigationTree> {
        throw new Error("Method not implemented.");
    }

    @Returns([OutliningSpan])
    @Method(String)
    getOutliningSpans(fileName: string): Promise<OutliningSpan[]> {
        throw new Error("Method not implemented.");
    }


    @Returns([TodoComment])
    @Method(String, [TodoCommentDescriptor])
    getTodoComments(fileName: string, descriptors: TodoCommentDescriptor[]): Promise<TodoComment[]> {
        throw new Error("Method not implemented.");
    }

    @Returns([TextSpan])
    @Method(String, Number)
    getBraceMatchingAtPosition(fileName: string, position: number): Promise<TextSpan[]> {
        throw new Error("Method not implemented.");
    }

    @Returns(Number)
    @Method(String, Number, EditorOptions)
    getIndentationAtPosition(fileName: string, position: number, options: EditorOptions): number | Promise<number> {
        throw new Error("Method not implemented.");
    }

    @Returns([TextChange])
    @Method(String, Number, Number, FormatCodeSettings)
    getFormattingEditsForRange(fileName: string, start: number, end: number, options: /*FormatCodeOptions TODO |*/ FormatCodeSettings): Promise<TextChange[]> {
        throw new Error("Method not implemented.");
    }

    @Returns([TextChange])
    @Method(String, FormatCodeSettings)
    getFormattingEditsForDocument(fileName: string, options: /*FormatCodeOptions TODO |*/ FormatCodeSettings): Promise<TextChange[]> {
        throw new Error("Method not implemented.");
    }

    @Returns([TextChange])
    @Method(String, Number, String, FormatCodeSettings)
    getFormattingEditsAfterKeystroke(fileName: string, position: number, key: string, options: /*FormatCodeOptions TODO |*/ FormatCodeSettings): TextChange[] | Promise<TextChange[]> {
        throw new Error("Method not implemented.");
    }

    @Returns(TextInsertion)
    @Method(String, Number)
    getDocCommentTemplateAtPosition(fileName: string, position: number): Promise<TextInsertion> {
        throw new Error("Method not implemented.");
    }

    @Returns(TextInsertion)
    @Method(String, Number, Number)
    isValidBraceCompletionAtPosition(fileName: string, position: number, openingBrace: number): Promise<TextRange> {
        throw new Error("Method not implemented.");
    }

    @Returns(JsxClosingTagInfo)
    @Method(String, Number)
    getJsxClosingTagAtPosition(fileName: string, position: number): Promise<JsxClosingTagInfo> {
        throw new Error("Method not implemented.");
    }

    @Returns(TextSpan)
    @Method(String, Number, TextRange)
    getSpanOfEnclosingComment(fileName: string, position: number, onlyMultiLine: TextRange): Promise<TextSpan> {
        throw new Error("Method not implemented.");
    }

    @Returns(LineAndCharacter)
    @Method(String, Number)
    toLineColumnOffset(fileName: string, position: number): Promise<LineAndCharacter> {
        throw new Error("Method not implemented.");
    }

    @Returns(CodeFixAction)
    @Method(String, Number, Number, [Number], FormatCodeSettings, UserPreferences)
    getCodeFixesAtPosition(fileName: string, start: number, end: number, errorCodes: readonly number[], formatOptions: FormatCodeSettings, preferences: UserPreferences): Promise<readonly CodeFixAction[]> {
        throw new Error("Method not implemented.");
    }

    @Returns(CombinedCodeActions)
    @Method(CombinedCodeFixScope, Object, FormatCodeSettings, UserPreferences)
    getCombinedCodeFix(scope: CombinedCodeFixScope, fixId: {}, formatOptions: FormatCodeSettings, preferences: UserPreferences): Promise<CombinedCodeActions> {
        throw new Error("Method not implemented.");
    }

    @Returns(ApplyCodeActionCommandResult)
    @Method(Object, FormatCodeSettings)
    applyCodeActionCommand(action: ts.InstallPackageAction, formatSettings?: FormatCodeSettings): Promise<ApplyCodeActionCommandResult> {
        throw new Error("Method not implemented.");
    }

    @Returns([ApplyCodeActionCommandResult])
    @Method([Object], FormatCodeSettings)
    applyCodeActionCommandArray(action: ts.InstallPackageAction[], formatSettings?: FormatCodeSettings): Promise<Promise<ApplyCodeActionCommandResult[]>> {
        throw new Error("Method not implemented.");
    }

    @Returns(ApplyCodeActionCommandResult)
    @Method(String, Object)
    applyCodeActionCommandFile(fileName: string, action: ts.InstallPackageAction): Promise<ApplyCodeActionCommandResult> {
        throw new Error("Method not implemented.");
    }

    @Returns(ApplyCodeActionCommandResult)
    @Method(String, [Object])
    applyCodeActionCommandFileArray(fileName: string, action: ts.InstallPackageAction[]): Promise<ApplyCodeActionCommandResult[]> {
        throw new Error("Method not implemented.");
    }

    @Returns([ApplicableRefactorInfo])
    @Method(String, Object, UserPreferences) // TODO support OR
    getApplicableRefactors(fileName: string, positionOrRange: number | TextRange, preferences: UserPreferences): Promise<ApplicableRefactorInfo[]> {
        throw new Error("Method not implemented.");
    }

    @Returns(RefactorEditInfo)
    @Method(String, FormatCodeSettings, Object, String, String, UserPreferences) // TODO support OR
    getEditsForRefactor(fileName: string, formatOptions: FormatCodeSettings, positionOrRange: number | TextRange, refactorName: string, actionName: string, preferences: UserPreferences): Promise<RefactorEditInfo> {
        throw new Error("Method not implemented.");
    }

    @Returns([FileTextChanges])
    @Method(CombinedCodeFixScope, FormatCodeSettings, UserPreferences)
    organizeImports(scope: CombinedCodeFixScope, formatOptions: FormatCodeSettings, preferences: UserPreferences): Promise<readonly FileTextChanges[]> {
        throw new Error("Method not implemented.");
    }

    @Returns([FileTextChanges])
    @Method(String, String, FormatCodeSettings, UserPreferences)
    getEditsForFileRename(oldFilePath: string, newFilePath: string, formatOptions: FormatCodeSettings, preferences: UserPreferences): Promise<readonly FileTextChanges[]> {
        throw new Error("Method not implemented.");
    }

    @Returns(EmitOutput)
    @Method(String, Boolean)
    getEmitOutput(fileName: string, emitOnlyDtsFiles?: boolean): Promise<EmitOutput> {
        throw new Error("Method not implemented.");
    }

    @Returns()
    @Method()
    dispose(): void | Promise<void> {
        throw new Error("Method not implemented.");
    }



}






export interface ILanguageServiceAsync {
    cleanupSemanticCache(): Promise<void> | void;
    getSyntacticDiagnostics(fileName: string): Promise<DiagnosticWithLocation[]> | DiagnosticWithLocation[];
    getSemanticDiagnostics(fileName: string): Promise<Diagnostic[]> | Diagnostic[];
    getSuggestionDiagnostics(fileName: string): Promise<DiagnosticWithLocation[]> | DiagnosticWithLocation[];
    getCompilerOptionsDiagnostics(): Promise<Diagnostic[]> | Diagnostic[];
    getSyntacticClassifications(fileName: string, span: TextSpan): Promise<ClassifiedSpan[]> | ClassifiedSpan[];
    getSemanticClassifications(fileName: string, span: TextSpan): Promise<ClassifiedSpan[]> | ClassifiedSpan[];
    getEncodedSyntacticClassifications(fileName: string, span: TextSpan): Promise<Classifications> | Classifications;
    getEncodedSemanticClassifications(fileName: string, span: TextSpan): Promise<Classifications> | Classifications;
    getCompletionsAtPosition(fileName: string, position: number, options: GetCompletionsAtPositionOptions | undefined): Promise<ts.WithMetadata<ts.CompletionInfo> | undefined> | ts.WithMetadata<ts.CompletionInfo> | undefined;
    getCompletionEntryDetails(fileName: string, position: number, name: string, formatOptions: /*FormatCodeOptions TODO |*/ FormatCodeSettings | undefined, source: string | undefined, preferences: UserPreferences | undefined): Promise<CompletionEntryDetails | undefined> | CompletionEntryDetails | undefined;
    // getCompletionEntrySymbol(fileName: string, position: number, name: string, source: string | undefined): Promise<Symbol | undefined> | Symbol | undefined;
    getQuickInfoAtPosition(fileName: string, position: number): Promise<QuickInfo | undefined> | QuickInfo | undefined;
    getNameOrDottedNameSpan(fileName: string, startPos: number, endPos: number): Promise<TextSpan | undefined> | TextSpan | undefined;
    getBreakpointStatementAtPosition(fileName: string, position: number): Promise<TextSpan | undefined> | TextSpan | undefined;
    getSignatureHelpItems(fileName: string, position: number, options: SignatureHelpItemsOptions | undefined): Promise<SignatureHelpItems | undefined> | SignatureHelpItems | undefined;
    getRenameInfo(fileName: string, position: number, options?: RenameInfoOptions): Promise<RenameInfo> | RenameInfo;
    findRenameLocations(fileName: string, position: number, findInStrings: boolean, findInComments: boolean, providePrefixAndSuffixTextForRename?: boolean): Promise<ReadonlyArray<RenameLocation> | undefined> | ReadonlyArray<RenameLocation> | undefined;
    getSmartSelectionRange(fileName: string, position: number): Promise<SelectionRange> | SelectionRange;
    getDefinitionAtPosition(fileName: string, position: number): Promise<ReadonlyArray<DefinitionInfo> | undefined> | ReadonlyArray<DefinitionInfo> | undefined;
    getDefinitionAndBoundSpan(fileName: string, position: number): Promise<DefinitionInfoAndBoundSpan | undefined> | DefinitionInfoAndBoundSpan | undefined;
    getTypeDefinitionAtPosition(fileName: string, position: number): Promise<ReadonlyArray<DefinitionInfo> | undefined> | ReadonlyArray<DefinitionInfo> | undefined;
    getImplementationAtPosition(fileName: string, position: number): Promise<ReadonlyArray<ImplementationLocation> | undefined> | ReadonlyArray<ImplementationLocation> | undefined;
    getReferencesAtPosition(fileName: string, position: number): Promise<ReferenceEntry[] | undefined> | ReferenceEntry[] | undefined;
    findReferences(fileName: string, position: number): Promise<ReferencedSymbol[] | undefined> | ReferencedSymbol[] | undefined;
    getDocumentHighlights(fileName: string, position: number, filesToSearch: string[]): Promise<DocumentHighlights[] | undefined> | DocumentHighlights[] | undefined;
    getOccurrencesAtPosition(fileName: string, position: number): Promise<ReadonlyArray<ReferenceEntry> | undefined> | ReadonlyArray<ReferenceEntry> | undefined;
    getNavigateToItems(searchValue: string, maxResultCount?: number, fileName?: string, excludeDtsFiles?: TextRange): Promise<NavigateToItem[]> | NavigateToItem[];
    getNavigationBarItems(fileName: string): Promise<NavigationBarItem[]> | NavigationBarItem[];
    getNavigationTree(fileName: string): Promise<NavigationTree> | NavigationTree;
    getOutliningSpans(fileName: string): Promise<OutliningSpan[]> | OutliningSpan[];
    getTodoComments(fileName: string, descriptors: TodoCommentDescriptor[]): Promise<TodoComment[]> | TodoComment[];
    getBraceMatchingAtPosition(fileName: string, position: number): Promise<TextSpan[]> | TextSpan[];
    getIndentationAtPosition(fileName: string, position: number, options: EditorOptions): Promise<number> | number;
    getFormattingEditsForRange(fileName: string, start: number, end: number, options: /*FormatCodeOptions TODO |*/ FormatCodeSettings): Promise<TextChange[]> | TextChange[];
    getFormattingEditsForDocument(fileName: string, options: /*FormatCodeOptions TODO |*/ FormatCodeSettings): Promise<TextChange[]> | TextChange[];
    getFormattingEditsAfterKeystroke(fileName: string, position: number, key: string, options: /*FormatCodeOptions TODO |*/ FormatCodeSettings): Promise<TextChange[]> | TextChange[];
    getDocCommentTemplateAtPosition(fileName: string, position: number): Promise<TextInsertion | undefined> | TextInsertion | undefined;
    isValidBraceCompletionAtPosition(fileName: string, position: number, openingBrace: number): Promise<TextRange> | TextRange;
    getJsxClosingTagAtPosition(fileName: string, position: number): Promise<JsxClosingTagInfo | undefined> | JsxClosingTagInfo | undefined;
    getSpanOfEnclosingComment(fileName: string, position: number, onlyMultiLine: TextRange): Promise<TextSpan | undefined> | TextSpan | undefined;
    toLineColumnOffset?(fileName: string, position: number): Promise<LineAndCharacter> | LineAndCharacter;
    getCodeFixesAtPosition(fileName: string, start: number, end: number, errorCodes: ReadonlyArray<number>, formatOptions: FormatCodeSettings, preferences: UserPreferences): Promise<ReadonlyArray<CodeFixAction>> | ReadonlyArray<CodeFixAction>;
    getCombinedCodeFix(scope: CombinedCodeFixScope, fixId: {}, formatOptions: FormatCodeSettings, preferences: UserPreferences): Promise<CombinedCodeActions> | CombinedCodeActions;
    applyCodeActionCommand(action: ts.CodeActionCommand, formatSettings?: FormatCodeSettings): Promise<Promise<ApplyCodeActionCommandResult>> | Promise<ApplyCodeActionCommandResult>;
    applyCodeActionCommandArray(action: ts.CodeActionCommand[], formatSettings?: FormatCodeSettings): Promise<Promise<ApplyCodeActionCommandResult[]>> | Promise<ApplyCodeActionCommandResult[]>;
    applyCodeActionCommandFile(fileName: string, action: ts.CodeActionCommand): Promise<Promise<ApplyCodeActionCommandResult>> | Promise<ApplyCodeActionCommandResult>;
    applyCodeActionCommandFileArray(fileName: string, action: ts.CodeActionCommand[]): Promise<Promise<ApplyCodeActionCommandResult[]>> | Promise<ApplyCodeActionCommandResult[]>;
    getApplicableRefactors(fileName: string, positionOrRange: number | TextRange, preferences: UserPreferences | undefined): Promise<ApplicableRefactorInfo[]> | ApplicableRefactorInfo[];
    getEditsForRefactor(fileName: string, formatOptions: FormatCodeSettings, positionOrRange: number | TextRange, refactorName: string, actionName: string, preferences: UserPreferences | undefined): Promise<RefactorEditInfo | undefined> | RefactorEditInfo | undefined;
    organizeImports(scope: CombinedCodeFixScope, formatOptions: FormatCodeSettings, preferences: UserPreferences | undefined): Promise<ReadonlyArray<FileTextChanges>> | ReadonlyArray<FileTextChanges>;
    getEditsForFileRename(oldFilePath: string, newFilePath: string, formatOptions: FormatCodeSettings, preferences: UserPreferences | undefined): Promise<ReadonlyArray<FileTextChanges>> | ReadonlyArray<FileTextChanges>;
    getEmitOutput(fileName: string, emitOnlyDtsFiles?: boolean): Promise<EmitOutput> | EmitOutput;
    dispose(): Promise<void> | void;
}

