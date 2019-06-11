import { SyntaxKind as _, ParenthesizedExpression, Decorator, CallExpression, PropertyAccessExpression, InterfaceDeclaration, ImportDeclaration, StringLiteral, Node } from 'typescript';
const SyntaxKind = _;
/**
 * depending on the node type, it will try to return the name of that node
 * @param node node of which the name will try to be found
 */
export function getNodeName(node: Node): string {
    if (node) {
        if (typeof (node as any).escapedText === 'string') {
            return (node as any).escapedText;
        }
        switch (node.kind) {
            case SyntaxKind.Parameter:
            case SyntaxKind.PropertyAssignment:
            case SyntaxKind.FunctionExpression:
            case SyntaxKind.ImportSpecifier:
            case SyntaxKind.ClassDeclaration:
            case SyntaxKind.MethodDeclaration:
            case SyntaxKind.PropertyDeclaration:
            case SyntaxKind.GetAccessor:
            case SyntaxKind.SetAccessor:
            case SyntaxKind.TypeAliasDeclaration:
            case SyntaxKind.NamespaceImport:
                return getNodeName((node as any).name);
            case SyntaxKind.TypeReference:
                return getNodeName((node as any).typeName);
            case SyntaxKind.Decorator:
                return getNodeName((node as Decorator).expression);
            case SyntaxKind.ParenthesizedExpression:
                return getNodeName((node as ParenthesizedExpression).expression);
            case SyntaxKind.CallExpression:
                return getNodeName((node as CallExpression).expression);
            case SyntaxKind.PropertyAccessExpression:
                return getNodeName((node as PropertyAccessExpression).name);
            case SyntaxKind.StringLiteral:
                return (node as StringLiteral).text;
            case SyntaxKind.InterfaceDeclaration:
                return getNodeName((node as InterfaceDeclaration).name);
            case SyntaxKind.ImportKeyword:
                return 'import';
            case SyntaxKind.ThisKeyword:
                return 'this';
            case SyntaxKind.SuperKeyword:
                return 'super';
            case SyntaxKind.FirstNode:
                return getNodeName((node as any).left) + '.' + getNodeName((node as any).right);
            case SyntaxKind.ImportDeclaration:
                const mods = (node as ImportDeclaration).importClause.modifiers;
                if (mods.length === 1) {
                    return getNodeName(mods[0]);
                }
            // tslint:disable-next-line:no-switch-case-fall-through
            default:
                throw new Error('Could not get name for node of  type ' + SyntaxKind[node.kind]);
        }
    }
    return '';
}
