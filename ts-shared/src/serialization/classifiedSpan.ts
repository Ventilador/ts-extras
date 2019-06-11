import { Move, Enum } from "@ts-utils/serialization";
import { TextSpan } from "./textSpan";
import { Serializer } from "@ts-utils/serialization";

@Move()
export class ClassifiedSpan extends Serializer implements ts.ClassifiedSpan {
    @Move(TextSpan) textSpan: TextSpan;
    @Move(Enum) classificationType: ts.ClassificationTypeNames;
}