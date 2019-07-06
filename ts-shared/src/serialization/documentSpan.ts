import { TextSpan } from "./textSpan";
import { Move } from "@ts-extras/serialization";
import { Serializer } from "@ts-extras/serialization";

@Move()
export class DocumentSpan extends Serializer implements ts.DocumentSpan {
    @Move(TextSpan) textSpan: TextSpan;
    @Move(String) fileName: string;
    @Move(TextSpan, true) originalTextSpan?: TextSpan;
    @Move(String, true) originalFileName?: string;
    something() {

    }
}
