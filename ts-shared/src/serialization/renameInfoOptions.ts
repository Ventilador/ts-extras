import { Move } from "@ts-extras/serialization";
import { Serializer } from "@ts-extras/serialization";

@Move()
export class RenameInfoOptions extends Serializer implements ts.RenameInfoOptions {
    @Move(Boolean, true) readonly allowRenameOfImportPath?: boolean;
}