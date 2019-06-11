import { Move } from "@ts-utils/serialization";
import { Serializer } from "@ts-utils/serialization";

@Move()
export class JsxClosingTagInfo extends Serializer implements ts.JsxClosingTagInfo {
    @Move(String) readonly newText: string;
}