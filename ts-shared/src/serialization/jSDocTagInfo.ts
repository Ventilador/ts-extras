import { Move } from "@ts-extras/serialization";
import { Serializer } from "@ts-extras/serialization";

@Move()
export class JSDocTagInfo extends Serializer implements ts.JSDocTagInfo {
    @Move(String) name: string;
    @Move(String, true) text?: string;
}