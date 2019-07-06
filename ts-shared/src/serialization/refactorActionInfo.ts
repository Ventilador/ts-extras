import { Serializer } from "@ts-extras/serialization";
import { Move } from "@ts-extras/serialization";
@Move()
export class RefactorActionInfo extends Serializer implements ts.RefactorActionInfo {
    @Move(String) name: string;
    @Move(String) description: string;
}