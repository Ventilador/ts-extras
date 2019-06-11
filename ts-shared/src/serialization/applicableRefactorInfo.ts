import { Move } from "@ts-utils/serialization";
import { RefactorActionInfo } from "./refactorActionInfo";
import { Serializer } from "@ts-utils/serialization";

@Move()
export class ApplicableRefactorInfo extends Serializer implements ts.ApplicableRefactorInfo {
    @Move(String) name: string;
    @Move(String) description: string;
    @Move(Boolean, true) inlineable?: boolean;
    @Move([RefactorActionInfo]) actions: RefactorActionInfo[];
}