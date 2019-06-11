import { ReferenceEntry } from "./referenceEntry";
import { Move } from "@ts-utils/serialization";
import { ReferencedSymbolDefinitionInfo } from "./referencedSymbolDefinitionInfo";
import { Serializer } from "@ts-utils/serialization";

@Move()
export class ReferencedSymbol extends Serializer implements ts.ReferencedSymbol {
    @Move(ReferencedSymbolDefinitionInfo) definition: ReferencedSymbolDefinitionInfo;
    @Move([ReferenceEntry]) references: ReferenceEntry[];
}