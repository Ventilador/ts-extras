import { Move } from "@ts-utils/serialization";
import { Serializer } from "@ts-utils/serialization";

@Move()
export class JSDocTagInfo extends Serializer implements ts.JSDocTagInfo {
    @Move(String) name: string;
    @Move(String, true) text?: string;
}