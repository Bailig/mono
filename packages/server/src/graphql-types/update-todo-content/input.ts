import { Field, ID, InputType } from "type-graphql";

@InputType()
export class UpdateTodoContentInput {
  @Field(() => ID)
  id: string;

  @Field()
  content: string;
}
