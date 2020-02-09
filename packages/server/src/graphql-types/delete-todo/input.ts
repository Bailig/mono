import { Field, ID, InputType } from "type-graphql";

@InputType()
export class DeleteTodoInput {
  @Field(() => ID)
  id: string;
}
