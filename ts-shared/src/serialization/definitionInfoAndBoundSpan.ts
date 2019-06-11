import { Move } from "@ts-utils/serialization";
import { DefinitionInfo } from "./definitionInfo";
import { TextSpan } from "./textSpan";
import { Serializer } from "@ts-utils/serialization";

@Move()
export class DefinitionInfoAndBoundSpan extends Serializer implements ts.DefinitionInfoAndBoundSpan {
    @Move([DefinitionInfo], true) definitions?: ReadonlyArray<DefinitionInfo>;
    @Move(TextSpan) textSpan: TextSpan;
}