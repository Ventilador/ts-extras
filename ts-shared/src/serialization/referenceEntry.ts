import { DocumentSpan } from "./documentSpan";
import { Move } from "@ts-utils/serialization";

@Move()
export class ReferenceEntry extends DocumentSpan implements ts.ReferenceEntry {
    @Move(Boolean) isWriteAccess: boolean;
    @Move(Boolean) isDefinition: boolean;
    @Move(Boolean, true) isInString?: true;
}