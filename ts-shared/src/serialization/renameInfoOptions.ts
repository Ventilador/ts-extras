import { Move } from "@ts-utils/serialization";
import { Serializer } from "@ts-utils/serialization";

@Move()
export class RenameInfoOptions extends Serializer implements ts.RenameInfoOptions {
    @Move(Boolean, true) readonly allowRenameOfImportPath?: boolean;
}