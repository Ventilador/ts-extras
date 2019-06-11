import { Serializer } from "@ts-utils/serialization";
import { OutputFile } from "./outputFile";
import { Move } from "@ts-utils/serialization";

@Move()
export class EmitOutput extends Serializer implements ts.EmitOutput {
    @Move([OutputFile]) outputFiles: OutputFile[];
    @Move(Boolean) emitSkipped: boolean;
}