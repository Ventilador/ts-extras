import { Move } from "@ts-extras/serialization";
import { Serializer } from "@ts-extras/serialization";

@Move()
export class Classifications extends Serializer implements ts.Classifications {
    @Move([Number]) spans: number[];
    @Move(Number) endOfLineState: ts.EndOfLineState;
}