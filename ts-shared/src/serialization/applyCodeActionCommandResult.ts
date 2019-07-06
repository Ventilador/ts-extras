import { Move } from "@ts-extras/serialization";
import { Serializer } from "@ts-extras/serialization";

@Move()
export class ApplyCodeActionCommandResult extends Serializer implements ts.ApplyCodeActionCommandResult {
    @Move(String) successMessage: string;
}