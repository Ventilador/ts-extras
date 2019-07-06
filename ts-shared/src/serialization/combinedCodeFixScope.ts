import { Move } from "@ts-extras/serialization";
import { Serializer } from "@ts-extras/serialization";

@Move()
export class CombinedCodeFixScope extends Serializer implements ts.CombinedCodeFixScope {
    @Move(String) type: "file";
    @Move(String) fileName: string;
}