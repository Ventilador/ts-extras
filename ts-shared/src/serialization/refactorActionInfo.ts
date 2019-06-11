import { Serializer } from "@ts-utils/serialization";
import { Move } from "@ts-utils/serialization";
@Move()
export class RefactorActionInfo extends Serializer implements ts.RefactorActionInfo {
    @Move(String) name: string;
    @Move(String) description: string;
}