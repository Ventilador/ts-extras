import { Move } from "@ts-utils/serialization";
import { Serializer } from "@ts-utils/serialization";

@Move()
export class Classifications extends Serializer implements ts.Classifications {
    @Move([Number]) spans: number[];
    @Move(Number) endOfLineState: ts.EndOfLineState;
}