import { Move } from "@ts-extras/serialization";
import { Serializer } from "@ts-extras/serialization";

@Move()
export class JsxClosingTagInfo extends Serializer implements ts.JsxClosingTagInfo {
    @Move(String) readonly newText: string;
}