import { LanguageServerAsync } from "@ts-utils/shared";
import { createArgLangServiceTester } from "../createArgLangServiceTester";

describe('applyCodeActionCommand method', () => {
    let lang: LanguageServerAsync;
    beforeEach(function () {
        lang = createArgLangServiceTester(LanguageServerAsync.Metadata);
    });

    it('should support being called with 1 arg', function () {
        lang.applyCodeActionCommand({ a: true });
    });

    it('should support being called with 2 arg', function () {
        lang.applyCodeActionCommand({ a: true }, {});
    });

    it('should support being called all', function () {
        lang.applyCodeActionCommand({ a: true }, {
            indentMultiLineObjectLiteralBeginningOnBlankLine: true,
            insertSpaceAfterCommaDelimiter: false,
            insertSpaceAfterConstructor: true,
            insertSpaceAfterFunctionKeywordForAnonymousFunctions: false,
            insertSpaceAfterKeywordsInControlFlowStatements: true,
            insertSpaceAfterOpeningAndBeforeClosingJsxExpressionBraces: false,
            insertSpaceAfterOpeningAndBeforeClosingNonemptyBraces: false,
            insertSpaceAfterOpeningAndBeforeClosingNonemptyBrackets: true,
            insertSpaceAfterOpeningAndBeforeClosingNonemptyParenthesis: false,
            insertSpaceAfterOpeningAndBeforeClosingTemplateStringBraces: true,
            insertSpaceAfterSemicolonInForStatements: true,
            insertSpaceAfterTypeAssertion: false,
            insertSpaceBeforeAndAfterBinaryOperators: false,
            insertSpaceBeforeFunctionParenthesis: false,
            insertSpaceBeforeTypeAnnotation: true,
            placeOpenBraceOnNewLineForControlBlocks: false,
            placeOpenBraceOnNewLineForFunctions: true
        });
    });

    it('should support being called some', function () {
        lang.applyCodeActionCommand({ a: true }, {
            // indentMultiLineObjectLiteralBeginningOnBlankLine: true,
            insertSpaceAfterCommaDelimiter: false,
            // insertSpaceAfterConstructor: true,
            insertSpaceAfterFunctionKeywordForAnonymousFunctions: false,
            // insertSpaceAfterKeywordsInControlFlowStatements: true,
            insertSpaceAfterOpeningAndBeforeClosingJsxExpressionBraces: false,
            // insertSpaceAfterOpeningAndBeforeClosingNonemptyBraces: false,
            insertSpaceAfterOpeningAndBeforeClosingNonemptyBrackets: true,
            // insertSpaceAfterOpeningAndBeforeClosingNonemptyParenthesis: false,
            insertSpaceAfterOpeningAndBeforeClosingTemplateStringBraces: true,
            // insertSpaceAfterSemicolonInForStatements: true,
            insertSpaceAfterTypeAssertion: false,
            // insertSpaceBeforeAndAfterBinaryOperators: false,
            insertSpaceBeforeFunctionParenthesis: false,
            // insertSpaceBeforeTypeAnnotation: true,
            placeOpenBraceOnNewLineForControlBlocks: false,
            // placeOpenBraceOnNewLineForFunctions: true
        });
    });
});