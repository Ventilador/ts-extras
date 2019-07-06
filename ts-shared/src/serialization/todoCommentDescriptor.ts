import { Move } from "@ts-extras/serialization";
import { Serializer } from "@ts-extras/serialization";

@Move()
export class TodoCommentDescriptor extends Serializer implements ts.TodoCommentDescriptor {
    @Move(String) text: string;
    @Move(Number) priority: number;
}