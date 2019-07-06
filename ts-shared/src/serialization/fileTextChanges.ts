import { Move, Serializer } from "@ts-extras/serialization";
import { TextChange } from "./textChange";

@Move()
export class FileTextChanges extends Serializer implements ts.FileTextChanges {
    @Move(String) fileName: string;
    @Move([TextChange]) textChanges: TextChange[];
    @Move(Boolean, true) isNewFile?: boolean;
}