import { applyCodeActionCommandFactory } from "./applyCodeActionCommand";
import { findReferencesFactory } from "./findReferences";
import { getDefinitionAtPositionFactory } from "./getDefinitionAtPosition";
import { getSyntacticDiagnosticsFactory } from "./getSyntacticDiagnostics";
import { getApplicableRefactorsFactory } from "./getApplicableRefactors";
import { findRenameLocationsFactory } from "./findRenameLocations";
import { getBraceMatchingAtPositionFactory } from "./getBraceMatchingAtPosition";
import { getBreakpointStatementAtPositionFactory } from "./getBreakpointStatementAtPosition";
import { getCodeFixesAtPositionFactory } from "./getCodeFixesAtPosition";
import { getCombinedCodeFixFactory } from "./getCombinedCodeFix";
import { getCompletionEntryDetailsFactory } from "./getCompletionEntryDetails";
import { getCompletionEntrySymbolFactory } from "./getCompletionEntrySymbol";
import { getCompletionsAtPositionFactory } from "./getCompletionsAtPosition";
import { getDefinitionAndBoundSpanFactory } from "./getDefinitionAndBoundSpan";
import { getDocCommentTemplateAtPositionFactory } from "./getDocCommentTemplateAtPosition";
import { getDocumentHighlightsFactory } from "./getDocumentHighlights";
import { getEditsForFileRenameFactory } from "./getEditsForFileRename";
import { getEditsForRefactorFactory } from "./getEditsForRefactor";
import { getEmitOutputFactory } from "./getEmitOutput";
import { getEncodedSemanticClassificationsFactory } from "./getEncodedSemanticClassifications";
import { getEncodedSyntacticClassificationsFactory } from "./getEncodedSyntacticClassifications";
import { getFormattingEditsAfterKeystrokeFactory } from "./getFormattingEditsAfterKeystroke";
import { getFormattingEditsForDocumentFactory } from "./getFormattingEditsForDocument";
import { getFormattingEditsForRangeFactory } from "./getFormattingEditsForRange";
import { getImplementationAtPositionFactory } from "./getImplementationAtPosition";
import { getIndentationAtPositionFactory } from "./getIndentationAtPosition";
import { getJsxClosingTagAtPositionFactory } from "./getJsxClosingTagAtPosition";
import { getNameOrDottedNameSpanFactory } from "./getNameOrDottedNameSpan";
import { getNavigateToItemsFactory } from "./getNavigateToItems";
import { getNavigationTreeFactory } from "./getNavigationTree";
import { getOccurrencesAtPositionFactory } from "./getOccurrencesAtPosition";
import { getOutliningSpansFactory } from "./getOutliningSpans";
import { getQuickInfoAtPositionFactory } from "./getQuickInfoAtPosition";
import { getReferencesAtPositionFactory } from "./getReferencesAtPosition";
import { getRenameInfoFactory } from "./getRenameInfo";
import { getSemanticClassificationsFactory } from "./getSemanticClassifications";
import { getSemanticDiagnosticsFactory } from "./getSemanticDiagnostics";
import { getSignatureHelpItemsFactory } from "./getSignatureHelpItems";
import { getSmartSelectionRangeFactory } from "./getSmartSelectionRange";
import { getSpanOfEnclosingCommentFactory } from "./getSpanOfEnclosingComment";
import { getSuggestionDiagnosticsFactory } from "./getSuggestionDiagnostics";
import { getSyntacticClassificationsFactory } from "./getSyntacticClassifications";
import { getTodoCommentsFactory } from "./getTodoComments";
import { getTypeDefinitionAtPositionFactory } from "./getTypeDefinitionAtPosition";
import { isValidBraceCompletionAtPositionFactory } from "./isValidBraceCompletionAtPosition";
import { organizeImportsFactory } from "./organizeImports";
import { toLineColumnOffsetFactory } from "./toLineColumnOffset";
import { getNavigationBarItemsFactory } from "./getNavigationBarItems";
import { getNonBoundSourceFileFactory } from "./getNonBoundSourceFile";
import { getSourceMapperFactory } from "./getSourceMapper";

export const MethodFactories = [
    applyCodeActionCommandFactory,
    findReferencesFactory,
    getDefinitionAtPositionFactory,
    getSyntacticDiagnosticsFactory,
    getApplicableRefactorsFactory,
    findRenameLocationsFactory,
    getBraceMatchingAtPositionFactory,
    getBreakpointStatementAtPositionFactory,
    getCodeFixesAtPositionFactory,
    getCombinedCodeFixFactory,
    getCompletionEntryDetailsFactory,
    getCompletionEntrySymbolFactory,
    getCompletionsAtPositionFactory,
    getDefinitionAndBoundSpanFactory,
    getDocCommentTemplateAtPositionFactory,
    getDocumentHighlightsFactory,
    getEditsForFileRenameFactory,
    getEditsForRefactorFactory,
    getEmitOutputFactory,
    getEncodedSemanticClassificationsFactory,
    getEncodedSyntacticClassificationsFactory,
    getFormattingEditsAfterKeystrokeFactory,
    getFormattingEditsForDocumentFactory,
    getFormattingEditsForRangeFactory,
    getImplementationAtPositionFactory,
    getIndentationAtPositionFactory,
    getJsxClosingTagAtPositionFactory,
    getNameOrDottedNameSpanFactory,
    getNavigateToItemsFactory,
    getNavigationTreeFactory,
    getOccurrencesAtPositionFactory,
    getOutliningSpansFactory,
    getQuickInfoAtPositionFactory,
    getReferencesAtPositionFactory,
    getRenameInfoFactory,
    getSemanticClassificationsFactory,
    getSemanticDiagnosticsFactory,
    getSignatureHelpItemsFactory,
    getSmartSelectionRangeFactory,
    getSpanOfEnclosingCommentFactory,
    getSuggestionDiagnosticsFactory,
    getSyntacticClassificationsFactory,
    getTodoCommentsFactory,
    getTypeDefinitionAtPositionFactory,
    isValidBraceCompletionAtPositionFactory,
    organizeImportsFactory,
    toLineColumnOffsetFactory,
    getNavigationBarItemsFactory,
    getNonBoundSourceFileFactory,
    getSourceMapperFactory,
].reduce((prev, cur) => {
    prev[cur.name] = cur;
    return prev;
}, Object.create(null) as Record<string, Function>);

export { applyCodeActionCommandFactory } from "./applyCodeActionCommand";
export { findReferencesFactory } from "./findReferences";
export { getDefinitionAtPositionFactory } from "./getDefinitionAtPosition";
export { getSyntacticDiagnosticsFactory } from "./getSyntacticDiagnostics";
export { getApplicableRefactorsFactory } from "./getApplicableRefactors";
export { findRenameLocationsFactory } from "./findRenameLocations";
export { getBraceMatchingAtPositionFactory } from "./getBraceMatchingAtPosition";
export { getBreakpointStatementAtPositionFactory } from "./getBreakpointStatementAtPosition";
export { getCodeFixesAtPositionFactory } from "./getCodeFixesAtPosition";
export { getCombinedCodeFixFactory } from "./getCombinedCodeFix";
export { getCompletionEntryDetailsFactory } from "./getCompletionEntryDetails";
export { getCompletionEntrySymbolFactory } from "./getCompletionEntrySymbol";
export { getCompletionsAtPositionFactory } from "./getCompletionsAtPosition";
export { getDefinitionAndBoundSpanFactory } from "./getDefinitionAndBoundSpan";
export { getDocCommentTemplateAtPositionFactory } from "./getDocCommentTemplateAtPosition";
export { getDocumentHighlightsFactory } from "./getDocumentHighlights";
export { getEditsForFileRenameFactory } from "./getEditsForFileRename";
export { getEditsForRefactorFactory } from "./getEditsForRefactor";
export { getEmitOutputFactory } from "./getEmitOutput";
export { getEncodedSemanticClassificationsFactory } from "./getEncodedSemanticClassifications";
export { getEncodedSyntacticClassificationsFactory } from "./getEncodedSyntacticClassifications";
export { getFormattingEditsAfterKeystrokeFactory } from "./getFormattingEditsAfterKeystroke";
export { getFormattingEditsForDocumentFactory } from "./getFormattingEditsForDocument";
export { getFormattingEditsForRangeFactory } from "./getFormattingEditsForRange";
export { getImplementationAtPositionFactory } from "./getImplementationAtPosition";
export { getIndentationAtPositionFactory } from "./getIndentationAtPosition";
export { getJsxClosingTagAtPositionFactory } from "./getJsxClosingTagAtPosition";
export { getNameOrDottedNameSpanFactory } from "./getNameOrDottedNameSpan";
export { getNavigateToItemsFactory } from "./getNavigateToItems";
export { getNavigationTreeFactory } from "./getNavigationTree";
export { getOccurrencesAtPositionFactory } from "./getOccurrencesAtPosition";
export { getOutliningSpansFactory } from "./getOutliningSpans";
export { getQuickInfoAtPositionFactory } from "./getQuickInfoAtPosition";
export { getReferencesAtPositionFactory } from "./getReferencesAtPosition";
export { getRenameInfoFactory } from "./getRenameInfo";
export { getSemanticClassificationsFactory } from "./getSemanticClassifications";
export { getSemanticDiagnosticsFactory } from "./getSemanticDiagnostics";
export { getSignatureHelpItemsFactory } from "./getSignatureHelpItems";
export { getSmartSelectionRangeFactory } from "./getSmartSelectionRange";
export { getSpanOfEnclosingCommentFactory } from "./getSpanOfEnclosingComment";
export { getSuggestionDiagnosticsFactory } from "./getSuggestionDiagnostics";
export { getSyntacticClassificationsFactory } from "./getSyntacticClassifications";
export { getTodoCommentsFactory } from "./getTodoComments";
export { getTypeDefinitionAtPositionFactory } from "./getTypeDefinitionAtPosition";
export { isValidBraceCompletionAtPositionFactory } from "./isValidBraceCompletionAtPosition";
export { organizeImportsFactory } from "./organizeImports";
export { toLineColumnOffsetFactory } from "./toLineColumnOffset";
export { getNavigationBarItemsFactory } from "./getNavigationBarItems";
export { getNonBoundSourceFileFactory } from "./getNonBoundSourceFile";
export { getSourceMapperFactory } from "./getSourceMapper";




