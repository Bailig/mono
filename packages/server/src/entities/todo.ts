import { Field, ID, ObjectType } from "type-graphql";
import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@ObjectType({ description: "Object representing to-do item" })
@Entity()
export class Todo extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Field({ description: "The to-do item content" })
  @Column("text")
  content: string;

  @Field({ description: "Whether or not the to-do is completed" })
  @Column()
  isCompleted: boolean;
}
