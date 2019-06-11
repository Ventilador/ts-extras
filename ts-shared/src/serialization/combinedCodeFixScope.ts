import { Move } from "@ts-utils/serialization";
import { Serializer } from "@ts-utils/serialization";

@Move()
export class CombinedCodeFixScope extends Serializer implements ts.CombinedCodeFixScope {
    @Move(String) type: "file";
    @Move(String) fileName: string;
}