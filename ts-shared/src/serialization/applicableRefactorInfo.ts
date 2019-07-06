import { Move } from "@ts-extras/serialization";
import { RefactorActionInfo } from "./refactorActionInfo";
import { Serializer } from "@ts-extras/serialization";

@Move()
export class ApplicableRefactorInfo extends Serializer implements ts.ApplicableRefactorInfo {
    @Move(String) name: string;
    @Move(String) description: string;
    @Move(Boolean, true) inlineable?: boolean;
    @Move([RefactorActionInfo]) actions: RefactorActionInfo[];
}