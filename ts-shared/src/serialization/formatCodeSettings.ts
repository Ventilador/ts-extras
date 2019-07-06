import { Move, Serializer } from '@ts-extras/serialization';

@Move()
export class FormatCodeSettings extends Serializer implements ts.FormatCodeSettings {
    @Move(Boolean, true) readonly insertSpaceAfterCommaDelimiter?: boolean;
    @Move(Boolean, true) readonly insertSpaceAfterSemicolonInForStatements?: boolean;
    @Move(Boolean, true) readonly insertSpaceBeforeAndAfterBinaryOperators?: boolean;
    @Move(Boolean, true) readonly insertSpaceAfterConstructor?: boolean;
    @Move(Boolean, true) readonly insertSpaceAfterKeywordsInControlFlowStatements?: boolean;
    @Move(Boolean, true) readonly insertSpaceAfterFunctionKeywordForAnonymousFunctions?: boolean;
    @Move(Boolean, true) readonly insertSpaceAfterOpeningAndBeforeClosingNonemptyParenthesis?: boolean;
    @Move(Boolean, true) readonly insertSpaceAfterOpeningAndBeforeClosingNonemptyBrackets?: boolean;
    @Move(Boolean, true) readonly insertSpaceAfterOpeningAndBeforeClosingNonemptyBraces?: boolean;
    @Move(Boolean, true) readonly insertSpaceAfterOpeningAndBeforeClosingTemplateStringBraces?: boolean;
    @Move(Boolean, true) readonly insertSpaceAfterOpeningAndBeforeClosingJsxExpressionBraces?: boolean;
    @Move(Boolean, true) readonly insertSpaceAfterTypeAssertion?: boolean;
    @Move(Boolean, true) readonly insertSpaceBeforeFunctionParenthesis?: boolean;
    @Move(Boolean, true) readonly placeOpenBraceOnNewLineForFunctions?: boolean;
    @Move(Boolean, true) readonly placeOpenBraceOnNewLineForControlBlocks?: boolean;
    @Move(Boolean, true) readonly insertSpaceBeforeTypeAnnotation?: boolean;
    @Move(Boolean, true) readonly indentMultiLineObjectLiteralBeginningOnBlankLine?: boolean;
}