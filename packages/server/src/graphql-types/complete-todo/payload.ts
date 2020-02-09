import { Field, ObjectType } from "type-graphql";
import { Todo } from "../../entities";
import { UserError } from "../user-error/user-error";

@ObjectType()
export class CompleteTodoPayload {
  @Field(() => [UserError])
  userErrors: UserError[];

  @Field(() => Todo, { nullable: true })
  todo?: Todo;
}
