import { LanguageServerAsync } from "@ts-utils/shared";
import { createArgLangServiceTester } from "../createArgLangServiceTester";

describe('applyCodeActionCommandArray method', () => {
    let lang: LanguageServerAsync;
    beforeEach(function () {
        lang = createArgLangServiceTester(LanguageServerAsync.Metadata);
    });

    it('should support being called', function () {
        lang.applyCodeActionCommandArray([{ a: { b: true } }], {
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
});