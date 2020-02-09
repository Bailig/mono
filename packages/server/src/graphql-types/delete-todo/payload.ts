import { Field, ID, ObjectType } from "type-graphql";
import { UserError } from "../user-error/user-error";

@ObjectType()
export class DeleteTodoPayload {
  @Field(() => [UserError])
  userErrors: UserError[];

  @Field(() => ID, { nullable: true })
  deletedTodoId?: string;
}
