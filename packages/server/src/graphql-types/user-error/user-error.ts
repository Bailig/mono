import { Field, ObjectType } from "type-graphql";

@ObjectType()
export class UserError {
  @Field({ description: "Error message" })
  message: string;

  @Field({
    description: "Path to input field which caused the error",
  })
  path: string;
}
