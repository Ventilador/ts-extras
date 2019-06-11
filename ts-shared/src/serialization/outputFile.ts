import { Serializer } from "@ts-utils/serialization";
import { Move } from "@ts-utils/serialization";

@Move()
export class OutputFile extends Serializer implements ts.OutputFile {
    @Move(String) name: string;
    @Move(Boolean) writeByteOrderMark: boolean;
    @Move(String) text: string;
}