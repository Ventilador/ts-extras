import { TodoCommentDescriptor } from "./todoCommentDescriptor";
import { Move } from "@ts-extras/serialization";
import { Serializer } from "@ts-extras/serialization";

@Move()
export class TodoComment extends Serializer implements ts.TodoComment {
    @Move(TodoCommentDescriptor) descriptor: TodoCommentDescriptor;
    @Move(String) message: string;
    @Move(Number) position: number;
}