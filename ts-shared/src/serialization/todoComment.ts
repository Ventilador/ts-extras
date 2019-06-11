import { TodoCommentDescriptor } from "./todoCommentDescriptor";
import { Move } from "@ts-utils/serialization";
import { Serializer } from "@ts-utils/serialization";

@Move()
export class TodoComment extends Serializer implements ts.TodoComment {
    @Move(TodoCommentDescriptor) descriptor: TodoCommentDescriptor;
    @Move(String) message: string;
    @Move(Number) position: number;
}