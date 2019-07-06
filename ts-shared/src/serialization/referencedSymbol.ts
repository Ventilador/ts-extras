import { ReferenceEntry } from "./referenceEntry";
import { Move } from "@ts-extras/serialization";
import { ReferencedSymbolDefinitionInfo } from "./referencedSymbolDefinitionInfo";
import { Serializer } from "@ts-extras/serialization";

@Move()
export class ReferencedSymbol extends Serializer implements ts.ReferencedSymbol {
    @Move(ReferencedSymbolDefinitionInfo) definition: ReferencedSymbolDefinitionInfo;
    @Move([ReferenceEntry]) references: ReferenceEntry[];
}