import { Move } from "@ts-utils/serialization";
import { Serializer } from "@ts-utils/serialization";

@Move()
export class TodoCommentDescriptor extends Serializer implements ts.TodoCommentDescriptor {
    @Move(String) text: string;
    @Move(Number) priority: number;
}