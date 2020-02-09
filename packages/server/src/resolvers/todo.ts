import * as validator from "@mono/validator";
import { Arg, Mutation, Query, Resolver } from "type-graphql";
import { Todo } from "../entities";
import {
  CompleteTodoInput,
  CompleteTodoPayload,
  CreateTodoInput,
  CreateTodoPayload,
  DeleteTodoInput,
  DeleteTodoPayload,
  handleErrors,
  UpdateTodoContentInput,
  UpdateTodoContentPayload,
} from "../graphql-types";

@Resolver()
export class TodoResolver {
  @Query(() => [Todo])
  todos(): Promise<Todo[]> {
    return Todo.find();
  }

  @Mutation(() => CreateTodoPayload)
  async createTodo(
    @Arg("input", () => CreateTodoInput) input: CreateTodoInput,
  ): Promise<CreateTodoPayload> {
    try {
      const validInput = await validator.createTodo.validate(input);
      const todo = await Todo.create(validInput).save();
      return {
        userErrors: [],
        todo,
      };
    } catch (error) {
      return {
        userErrors: handleErrors(error),
      };
    }
  }

  @Mutation(() => DeleteTodoPayload)
  async deleteTodo(
    @Arg("input", () => DeleteTodoInput) input: DeleteTodoInput,
  ): Promise<DeleteTodoPayload> {
    try {
      await validator.deleteTodo.validate(input);
      await Todo.delete({ id: input.id });
      return {
        userErrors: [],
        deletedTodoId: input.id,
      };
    } catch (error) {
      return {
        userErrors: handleErrors(error),
      };
    }
  }

  @Mutation(() => UpdateTodoContentPayload)
  async updateTodoContent(
    @Arg("input", () => UpdateTodoContentInput) input: UpdateTodoContentInput,
  ): Promise<UpdateTodoContentPayload> {
    try {
      const validInput = await validator.updateTodoContent.validate(input);
      await Todo.update({ id: validInput.id }, validInput);
      const todo = await Todo.findOne({ id: validInput.id });
      return {
        userErrors: [],
        todo,
      };
    } catch (error) {
      return {
        userErrors: handleErrors(error),
      };
    }
  }

  @Mutation(() => CompleteTodoPayload)
  async completeTodo(
    @Arg("input", () => CompleteTodoInput) input: CompleteTodoInput,
  ): Promise<CompleteTodoPayload> {
    try {
      const validInput = await validator.completeTodo.validate(input);
      await Todo.update({ id: validInput.id }, { isCompleted: true });
      const todo = await Todo.findOne({ id: validInput.id });
      return {
        userErrors: [],
        todo,
      };
    } catch (error) {
      return {
        userErrors: handleErrors(error),
      };
    }
  }
}
