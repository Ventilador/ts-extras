import { TextSpan } from "./textSpan";
import { Move } from "@ts-utils/serialization";
import { Serializer } from "@ts-utils/serialization";

@Move()
export class DocumentSpan extends Serializer implements ts.DocumentSpan {
    @Move(TextSpan) textSpan: TextSpan;
    @Move(String) fileName: string;
    @Move(TextSpan, true) originalTextSpan?: TextSpan;
    @Move(String, true) originalFileName?: string;
    something() {

    }
}
