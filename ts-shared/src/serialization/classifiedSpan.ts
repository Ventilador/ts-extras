import { Move, Enum } from "@ts-extras/serialization";
import { TextSpan } from "./textSpan";
import { Serializer } from "@ts-extras/serialization";

@Move()
export class ClassifiedSpan extends Serializer implements ts.ClassifiedSpan {
    @Move(TextSpan) textSpan: TextSpan;
    @Move(Enum) classificationType: ts.ClassificationTypeNames;
}