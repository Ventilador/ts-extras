import { DocumentSpan } from "./documentSpan";
import { Move } from "@ts-extras/serialization";

@Move()
export class RenameLocation extends DocumentSpan implements ts.RenameLocation {
    @Move(String, true) prefixText?: string;
    @Move(String, true) suffixText?: string;
}