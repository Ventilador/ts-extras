import { Move } from "@ts-utils/serialization";
import { Serializer } from "@ts-utils/serialization";

@Move()
export class ApplyCodeActionCommandResult extends Serializer implements ts.ApplyCodeActionCommandResult {
    @Move(String) successMessage: string;
}