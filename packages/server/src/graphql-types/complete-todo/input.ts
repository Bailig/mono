import { Field, ID, InputType } from "type-graphql";

@InputType()
export class CompleteTodoInput {
  @Field(() => ID)
  id: string;
}
