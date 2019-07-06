import { Serializer } from "@ts-extras/serialization";
import { OutputFile } from "./outputFile";
import { Move } from "@ts-extras/serialization";

@Move()
export class EmitOutput extends Serializer implements ts.EmitOutput {
    @Move([OutputFile]) outputFiles: OutputFile[];
    @Move(Boolean) emitSkipped: boolean;
}