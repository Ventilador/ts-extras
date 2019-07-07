import {
    Diagnostic, FileTextChanges, ImplementationLocation, RefactorEditInfo, TextSpan,
    TextChange, DocumentHighlights, TextInsertion, DefinitionInfoAndBoundSpan,
    WithMetadata, CompletionInfo, CompletionEntryDetails, CombinedCodeActions,
    CombinedCodeFixScope, CodeFixAction, ApplicableRefactorInfo, TextRange, RenameLocation,
    DiagnosticWithLocation, DefinitionInfo, ReferencedSymbol, ReferenceEntry,
    LineAndCharacter, TodoComment, SelectionRange, SignatureHelpItems, ClassifiedSpan,
    RenameInfoSuccess, RenameInfoFailure, RenameInfo, QuickInfo, OutliningSpan,
    NavigationTree, NavigationBarItem, JsxClosingTagInfo, NavigateToItem, Classifications,
    CompletionEntry, CodeAction, ReferencedSymbolDefinitionInfo
} from "typescript/lib/tsserverlibrary";
import { loaders } from "@ts-extras/types";

export interface Mappers extends loaders.Loader {
    mapApplicableRefactorInfo(from: string, to: string, value: ApplicableRefactorInfo): ApplicableRefactorInfo;
    mapClassifications(from: string, to: string, value: Classifications): Classifications;
    mapClassifiedSpan(from: string, to: string, value: ClassifiedSpan): ClassifiedSpan;
    mapCodeAction(from: string, to: string, value: CodeAction): CodeAction;
    mapCodeFixAction(from: string, to: string, value: CodeFixAction): CodeFixAction;
    mapCombinedCodeActions(from: string, to: string, value: CombinedCodeActions): CombinedCodeActions;
    mapCombinedCodeFixScope(from: string, to: string, value: CombinedCodeFixScope): CombinedCodeFixScope;
    mapCompletionEntry(from: string, to: string, value: CompletionEntry): CompletionEntry;
    mapCompletionEntryDetails(from: string, to: string, value: CompletionEntryDetails): CompletionEntryDetails;
    mapDefinitionInfo(from: string, to: string, value: DefinitionInfo): DefinitionInfo;
    mapDefinitionInfoAndBoundSpan(from: string, to: string, value: DefinitionInfoAndBoundSpan): DefinitionInfoAndBoundSpan;
    mapDiagnostic(from: string, to: string, value: Diagnostic): Diagnostic;
    mapDiagnosticWithLocation(from: string, to: string, value: DiagnosticWithLocation): DiagnosticWithLocation;
    mapDocumentHighlights(from: string, to: string, value: DocumentHighlights): DocumentHighlights;
    mapFileTextChanges(from: string, to: string, value: FileTextChanges): FileTextChanges;
    mapImplementationLocation(from: string, to: string, value: ImplementationLocation): ImplementationLocation;
    mapJsxClosingTagInfo(from: string, to: string, value: JsxClosingTagInfo): JsxClosingTagInfo;
    mapLineAndCharacter(from: string, to: string, value: LineAndCharacter): LineAndCharacter;
    mapNavigateToItem(from: string, to: string, value: NavigateToItem): NavigateToItem;
    mapNavigationBarItem(from: string, to: string, value: NavigationBarItem): NavigationBarItem;
    mapNavigationTree(from: string, to: string, value: NavigationTree): NavigationTree;
    mapNumberOrTextRange(from: string, to: string, value: number | TextRange): number | TextRange;
    mapOutliningSpan(from: string, to: string, value: OutliningSpan): OutliningSpan;
    mapQuickInfo(from: string, to: string, value: QuickInfo): QuickInfo;
    mapRefactorEditInfo(from: string, to: string, value: RefactorEditInfo): RefactorEditInfo;
    mapReferenceEntry(from: string, to: string, value: ReferenceEntry): ReferenceEntry;
    mapReferencedSymbol(from: string, to: string, value: ReferencedSymbol): ReferencedSymbol;
    mapRenameInfo(from: string, to: string, value: RenameInfo): RenameInfo;
    mapRenameInfoFail(from: string, to: string, value: RenameInfoFailure): RenameInfoFailure;
    mapRenameInfoSuccess(from: string, to: string, value: RenameInfoSuccess): RenameInfoSuccess;
    mapRenameLocation(from: string, to: string, value: RenameLocation): RenameLocation;
    mapSelectionRange(from: string, to: string, value: SelectionRange): SelectionRange;
    mapSignatureHelpItems(from: string, to: string, value: SignatureHelpItems): SignatureHelpItems;
    mapTextChange(from: string, to: string, value: TextChange): TextChange;
    mapTextInsertion(from: string, to: string, value: TextInsertion): TextInsertion;
    mapTextSpan(from: string, to: string, value: TextSpan): TextSpan;
    mapTextRange(from: string, to: string, value: TextRange): TextRange;
    mapTodoComment(from: string, to: string, value: TodoComment): TodoComment;
    mapWithMetadataCompletionInfo(from: string, to: string, value: WithMetadata<CompletionInfo>): WithMetadata<CompletionInfo>;
}
export function createMappers(loader: loaders.Loader): Mappers {
    const { movePosition, moveFile, handles, wasRedirected, moveLineAndChar, toRedirected } = loader;
    const mapApplicableRefactorInfo = thru;
    const mapCombinedCodeFixScope = thru;
    const mapImplementationLocation = thru;
    const mapJsxClosingTagInfo = thru;
    const mapLineAndCharacter = moveLineAndChar;
    const mapTextInsertion = thru;
    const mapTodoComment = thru;

    return Object.assign({
        mapApplicableRefactorInfo,
        mapClassifications,
        mapClassifiedSpan,
        mapCodeAction,
        mapCodeFixAction,
        mapCombinedCodeActions,
        mapCombinedCodeFixScope,
        mapCompletionEntry,
        mapCompletionEntryDetails,
        mapDefinitionInfo,
        mapDefinitionInfoAndBoundSpan,
        mapDiagnostic,
        mapDiagnosticWithLocation,
        mapDocumentHighlights,
        mapFileTextChanges,
        mapImplementationLocation,
        mapJsxClosingTagInfo,
        mapLineAndCharacter,
        mapNavigateToItem,
        mapNavigationBarItem,
        mapNavigationTree,
        mapNumberOrTextRange,
        mapOutliningSpan,
        mapQuickInfo,
        mapRefactorEditInfo,
        mapReferenceEntry,
        mapReferencedSymbol,
        mapRenameInfo,
        mapRenameInfoFail,
        mapRenameInfoSuccess,
        mapRenameLocation,
        mapSelectionRange,
        mapSignatureHelpItems,
        mapTextChange,
        mapTextInsertion,
        mapTextSpan,
        mapTextRange,
        mapTodoComment,
        mapWithMetadataCompletionInfo,
    } as Mappers,
        loader);

    function mapClassifications(from: string, to: string, info: Classifications): Classifications {
        return {
            endOfLineState: info.endOfLineState,
            spans: info.spans.map(span => movePosition(from, to, span))
        };
    }
    function mapClassifiedSpan(from: string, to: string, info: ClassifiedSpan): ClassifiedSpan {
        return {
            classificationType: info.classificationType,
            textSpan: mapTextSpan(from, to, info.textSpan)
        };
    }
    function mapCodeAction(from: string, to: string, info: CodeAction): CodeAction {
        return Object.assign(mapCombinedCodeActions(from, to, info) as any, {
            description: info.description
        })
    }
    function mapCodeFixAction(from: string, to: string, info: CodeFixAction): CodeFixAction {
        if (info.commands) {
            console.trace('outCodeFixAction', from, info.commands);
            debugger;
        }
        return Object.assign(mapCombinedCodeActions(from, to, info) as any, {
            description: info.description,
            fixAllDescription: info.fixAllDescription,
            fixId: info.fixId,
            fixName: info.fixName,
        })
    }
    function mapCombinedCodeActions(from: string, to: string, info: CombinedCodeActions): CombinedCodeActions {
        return {
            changes: info.changes.map(i => mapFileTextChanges(from, to, i)),
            commands: info.commands
        }
    }
    function mapCompletionEntry(from: string, to: string, info: CompletionEntry): CompletionEntry {
        if (info.replacementSpan) {
            return {
                hasAction: info.hasAction,
                insertText: info.insertText,
                isRecommended: info.isRecommended,
                kind: info.kind,
                kindModifiers: info.kindModifiers,
                name: info.name,
                replacementSpan: mapTextSpan(from, to, info.replacementSpan),
                sortText: info.sortText,
                source: info.source,
            }
        }

        return info;
    }
    function mapCompletionEntryDetails(from: string, to: string, info: CompletionEntryDetails): CompletionEntryDetails {
        return {
            codeActions: info.codeActions ? info.codeActions.map(i => mapCodeAction(from, to, i)) : undefined,
            displayParts: info.displayParts,
            documentation: info.documentation,
            kind: info.kind,
            kindModifiers: info.kindModifiers,
            name: info.name,
            source: info.source,
            tags: info.tags,
        }
    }
    function mapDefinitionInfo(from: string, to: string, info: DefinitionInfo): DefinitionInfo {
        return {
            fileName: moveFile(from, to, info.fileName),
            kind: info.kind,
            name: info.name,
            originalFileName: moveFile(from, to, info.originalFileName),
            originalTextSpan: mapTextSpan(from, to, info.originalTextSpan),
            textSpan: mapTextSpan(from, to, info.textSpan),
            containerKind: info.containerKind,
            containerName: info.containerName,
        }
    }
    function mapDefinitionInfoAndBoundSpan(from: string, to: string, info: DefinitionInfoAndBoundSpan): DefinitionInfoAndBoundSpan {
        return {
            definitions: info.definitions && info.definitions.map(i => mapDefinitionInfo(from, to, i)),
            textSpan: mapTextSpan(from, to, info.textSpan),
        }
    }
    function mapDiagnostic(from: string, to: string, info: Diagnostic): Diagnostic {
        return {
            category: info.category,
            code: info.code,
            file: info.file,
            messageText: info.messageText,
            relatedInformation: info.relatedInformation,
            reportsUnnecessary: info.reportsUnnecessary,
            source: info.source,
            length: info.length,
            start: typeof info.start === 'number' ? movePosition(from, to, info.start) : undefined,
        }
    }
    function mapDiagnosticWithLocation(from: string, to: string, diag: DiagnosticWithLocation): DiagnosticWithLocation {
        return mapDiagnostic(from, to, diag);
    }
    function mapDocumentHighlights(from: string, to: string, info: DocumentHighlights): DocumentHighlights {
        return {
            fileName: moveFile(from, to, info.fileName),
            highlightSpans: info.highlightSpans.map(i => {
                if (i.fileName) {
                    console.trace(info.fileName, i.fileName);
                    debugger;
                }
                return {
                    fileName: i.fileName,
                    isInString: i.isInString,
                    kind: i.kind,
                    textSpan: mapTextSpan(from, to, i.textSpan)
                }
            }),
        }
    }
    function mapFileTextChanges(from: string, to: string, info: FileTextChanges): FileTextChanges {
        if (handles(info.fileName)) {
            from = info.fileName;
            to = toRedirected(info.fileName);


        } else {
            const newFile = wasRedirected(info.fileName);
            if (newFile) {
                from = newFile;
                to = info.fileName;
            }
        }
        return {
            fileName: moveFile(from, to, info.fileName),
            isNewFile: info.isNewFile,
            textChanges: info.textChanges.map(i => mapTextChange(from, to, i))
        };
    }
    function mapNavigateToItem(from: string, to: string, info: NavigateToItem): NavigateToItem {
        return {
            textSpan: mapTextSpan(from, to, info.textSpan),
            containerKind: info.containerKind,
            containerName: info.containerName,
            fileName: moveFile(from, to, info.fileName),
            isCaseSensitive: info.isCaseSensitive,
            kind: info.kind,
            kindModifiers: info.kindModifiers,
            matchKind: info.matchKind,
            name: info.name,
        };
    }
    function mapNavigationBarItem(from: string, to: string, info: NavigationBarItem): NavigationBarItem {
        return {
            bolded: info.bolded,
            childItems: info.childItems.map(i => mapNavigationBarItem(from, to, i)),
            grayed: info.grayed,
            indent: info.indent,
            kind: info.kind,
            kindModifiers: info.kindModifiers,
            spans: info.spans && info.spans.map(i => mapTextSpan(from, to, i)),
            text: info.text,
        }
    }
    function mapNavigationTree(from: string, to: string, info: NavigationTree): NavigationTree {
        return {
            childItems: info.childItems && info.childItems.map(c => mapNavigationTree(from, to, c)),
            kind: info.kind,
            kindModifiers: info.kindModifiers,
            nameSpan: info.nameSpan && mapTextSpan(from, to, info.nameSpan),
            spans: info.spans.map(i => mapTextSpan(from, to, i)),
            text: info.text,
        }
    }
    function mapNumberOrTextRange(from: string, to: string, info: number | TextRange): Number | TextRange {
        if (typeof info === 'number') {
            return movePosition(from, to, info);
        }
        return mapTextRange(from, to, info);
    }
    function mapOutliningSpan(from: string, to: string, info: OutliningSpan): OutliningSpan {
        return {
            autoCollapse: info.autoCollapse,
            bannerText: info.bannerText,
            hintSpan: mapTextSpan(from, to, info.hintSpan),
            kind: info.kind,
            textSpan: mapTextSpan(from, to, info.textSpan),
        }
    }
    function mapQuickInfo(from: string, to: string, info: QuickInfo): QuickInfo {
        return {
            displayParts: info.displayParts,
            documentation: info.documentation,
            kind: info.kind,
            kindModifiers: info.kindModifiers,
            tags: info.tags,
            textSpan: mapTextSpan(from, to, info.textSpan),
        }
    }
    function mapRefactorEditInfo(from: string, to: string, info: RefactorEditInfo): RefactorEditInfo {
        if (info.commands) {
            debugger;
            console.trace('outRefactorEditInfo->val.commands', info.commands);
        }

        return {
            commands: info.commands,
            renameFilename: info.renameFilename,
            edits: info.edits.map(i => mapFileTextChanges(from, to, i)),
            renameLocation: info.renameLocation && movePosition(from, to, info.renameLocation),
        }
    }
    function mapReferenceEntry(from: string, to: string, ref: ReferenceEntry): ReferenceEntry {
        if (handles(ref.fileName)) {
            from = ref.fileName;
            to = toRedirected(ref.fileName);
        } else if (from = wasRedirected(ref.fileName) as any) {
            to = ref.fileName;
        } else {
            return ref;
        }
        return {
            fileName: moveFile(from, to, ref.fileName),
            isDefinition: ref.isDefinition,
            isInString: ref.isInString,
            isWriteAccess: ref.isWriteAccess,
            originalFileName: moveFile(from, to, ref.originalFileName),
            originalTextSpan: mapTextSpan(from, to, ref.originalTextSpan),
            textSpan: mapTextSpan(from, to, ref.textSpan),
        }
    }
    function mapReferencedSymbol(from: string, to: string, symbol: ReferencedSymbol): ReferencedSymbol {
        return {
            definition: mapReferencedSymbolDefinitionInfo(from, to, symbol.definition),
            references: symbol.references.map(r => mapReferenceEntry(from, to, r))
        }
    }
    function mapReferencedSymbolDefinitionInfo(from: string, to: string, ref: ReferencedSymbolDefinitionInfo): ReferencedSymbolDefinitionInfo {
        return Object.assign(mapReferenceEntry(from, to, ref as any), {
            kind: ref.kind,
            name: ref.name,
            containerKind: ref.containerKind,
            containerName: ref.containerName,
            displayParts: ref.displayParts,
        });
    }

    function mapRenameInfo(from: string, to: string, val: RenameInfo): RenameInfo {
        if (isRenameInfoSuccess(val)) {
            return mapRenameInfoSuccess(from, to, val);
        }
        return mapRenameInfoFail(from, to, val);
    }
    function mapRenameInfoFail(_from: string, _to: string, info: RenameInfoFailure): RenameInfoFailure {
        return info;
    }
    function mapRenameInfoSuccess(from: string, to: string, val: RenameInfoSuccess): RenameInfoSuccess {
        return {
            canRename: val.canRename,
            displayName: val.displayName,
            fileToRename: moveFile(from, to, val.fileToRename),
            fullDisplayName: val.fullDisplayName,
            kind: val.kind,
            kindModifiers: val.kindModifiers,
            triggerSpan: mapTextSpan(from, to, val.triggerSpan),
        }
    }

    function mapRenameLocation(from: string, to: string, rename: RenameLocation): RenameLocation {
        if (handles(rename.fileName)) {
            from = rename.fileName;
            to = toRedirected(from);
        } else if (from = wasRedirected(rename.fileName) as any) {
            to = rename.fileName;
        } else {
            return rename;
        }

        return {
            fileName: moveFile(from, to, rename.fileName),
            originalFileName: moveFile(from, to, rename.originalFileName),
            originalTextSpan: mapTextSpan(from, to, rename.originalTextSpan),
            prefixText: rename.prefixText,
            suffixText: rename.suffixText,
            textSpan: mapTextSpan(from, to, rename.textSpan),
        }
    }
    function mapSelectionRange(from: string, to: string, info: SelectionRange): SelectionRange {
        return {
            parent: info.parent && mapSelectionRange(from, to, info.parent),
            textSpan: mapTextSpan(from, to, info.textSpan)
        }
    }
    function mapSignatureHelpItems(from: string, to: string, info: SignatureHelpItems): SignatureHelpItems {
        return {
            applicableSpan: mapTextSpan(from, to, info.applicableSpan),
            argumentCount: info.argumentCount,
            argumentIndex: info.argumentIndex,
            items: info.items,
            selectedItemIndex: info.selectedItemIndex,
        }
    }
    function mapTextChange(from: string, to: string, info: TextChange): TextChange {
        return {
            newText: info.newText,
            span: mapTextSpan(from, to, info.span),
        }
    }
    function mapTextSpan(from: string, to: string, info: TextSpan): TextSpan {
        return {
            length: info.length,
            start: movePosition(from, to, info.start),
        }
    }
    function mapTextRange(from: string, to: string, info: TextRange): TextRange {
        return {
            end: movePosition(from, to, info.end),
            pos: movePosition(from, to, info.pos),
        }
    }
    function mapWithMetadataCompletionInfo(from: string, to: string, info: WithMetadata<CompletionInfo>): WithMetadata<CompletionInfo> {
        if (info.metadata) {
            debugger;
            console.trace('outWithMetadataCompletionInfo->info.metadata:', info.metadata);
        }
        return {
            entries: info.entries.map(i => mapCompletionEntry(from, to, i)),
            isGlobalCompletion: info.isGlobalCompletion,
            isMemberCompletion: info.isMemberCompletion,
            isNewIdentifierLocation: info.isNewIdentifierLocation,
            metadata: info.metadata,
        }
    }

}


function thru<T>(_from: string, _to: string, val: T): T {
    return val;
}


function isRenameInfoSuccess(val: any): val is RenameInfoSuccess {
    return 'displayName' in val
        && 'fullDisplayName' in val;
}