import { Serializer } from "@ts-extras/serialization";
import { Move } from "@ts-extras/serialization";

@Move()
export class OutputFile extends Serializer implements ts.OutputFile {
    @Move(String) name: string;
    @Move(Boolean) writeByteOrderMark: boolean;
    @Move(String) text: string;
}