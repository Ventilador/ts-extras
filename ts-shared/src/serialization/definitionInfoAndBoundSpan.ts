import { Move } from "@ts-extras/serialization";
import { DefinitionInfo } from "./definitionInfo";
import { TextSpan } from "./textSpan";
import { Serializer } from "@ts-extras/serialization";

@Move()
export class DefinitionInfoAndBoundSpan extends Serializer implements ts.DefinitionInfoAndBoundSpan {
    @Move([DefinitionInfo], true) definitions?: ReadonlyArray<DefinitionInfo>;
    @Move(TextSpan) textSpan: TextSpan;
}