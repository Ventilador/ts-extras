import { FormatCodeSettings } from "./formatCodeSettings";
import { Move } from "@ts-extras/serialization";

@Move()
export class FormatCodeOptions extends FormatCodeSettings implements ts.FormatCodeOptions {
    @Move(Boolean) InsertSpaceAfterCommaDelimiter: boolean;
    @Move(Boolean) InsertSpaceAfterSemicolonInForStatements: boolean;
    @Move(Boolean) InsertSpaceBeforeAndAfterBinaryOperators: boolean;
    @Move(Boolean, true) InsertSpaceAfterConstructor?: boolean;
    @Move(Boolean) InsertSpaceAfterKeywordsInControlFlowStatements: boolean;
    @Move(Boolean) InsertSpaceAfterFunctionKeywordForAnonymousFunctions: boolean;
    @Move(Boolean) InsertSpaceAfterOpeningAndBeforeClosingNonemptyParenthesis: boolean;
    @Move(Boolean) InsertSpaceAfterOpeningAndBeforeClosingNonemptyBrackets: boolean;
    @Move(Boolean, true) InsertSpaceAfterOpeningAndBeforeClosingNonemptyBraces?: boolean;
    @Move(Boolean) InsertSpaceAfterOpeningAndBeforeClosingTemplateStringBraces: boolean;
    @Move(Boolean, true) InsertSpaceAfterOpeningAndBeforeClosingJsxExpressionBraces?: boolean;
    @Move(Boolean, true) InsertSpaceAfterTypeAssertion?: boolean;
    @Move(Boolean, true) InsertSpaceBeforeFunctionParenthesis?: boolean;
    @Move(Boolean) PlaceOpenBraceOnNewLineForFunctions: boolean;
    @Move(Boolean) PlaceOpenBraceOnNewLineForControlBlocks: boolean;
    @Move(Boolean, true) insertSpaceBeforeTypeAnnotation?: boolean;
    @Move(Number, true) BaseIndentSize?: number;
    @Move(Number) IndentSize: number;
    @Move(Number) TabSize: number;
    @Move(String) NewLineCharacter: string;
    @Move(Boolean) ConvertTabsToSpaces: boolean;
    @Move(Number) IndentStyle: ts.IndentStyle;
}