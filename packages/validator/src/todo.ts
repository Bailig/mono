import * as yup from "yup";
import { id } from "./shared-fields";

const content = yup
  .string()
  .trim()
  .min(1)
  .max(999)
  .required();

const isCompleted = yup.boolean().default(false);

export const createTodo = yup.object({
  content,
  isCompleted,
});

export const updateTodoContent = yup.object({
  id,
  content,
});

export const completeTodo = yup.object({
  id,
});

export const deleteTodo = yup.object({
  id,
});
