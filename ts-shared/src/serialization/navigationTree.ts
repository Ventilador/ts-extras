import { Move, Enum } from "@ts-utils/serialization";
import { TextSpan } from "./textSpan";
import { Serializer } from "@ts-utils/serialization";


@Move()
export class NavigationTree extends Serializer implements ts.NavigationTree {
    @Move(String) text: string;
    @Move(Enum) kind: ts.ScriptElementKind;
    @Move(String) kindModifiers: string;
    @Move([TextSpan]) spans: TextSpan[];
    @Move(TextSpan, true) nameSpan: TextSpan | undefined;
    @Move([NavigationTree], true) childItems?: NavigationTree[];
}