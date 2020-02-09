import * as R from "ramda";
import React, { FC } from "react";
import {
  useCompleteTodoMutation,
  useCreateTodoMutation,
  useDeleteTodoMutation,
  useGetTodosQuery,
} from "../../generated/graphql";
import { updateGetTodosQueryHelper } from "../../graphql";
import { CreateTodoForm, TodoList } from "./components";

export const Todo: FC = () => {
  // hooks
  const queryTodosResult = useGetTodosQuery();
  const [deleteTodo, deleteTodoResult] = useDeleteTodoMutation({
    update: (store, result) => {
      const deletedTodoId = result.data?.deleteTodo.deletedTodoId;
      if (!deletedTodoId) return;

      updateGetTodosQueryHelper(store, queryData => {
        const newTodos = R.filter(
          todo => todo.id !== deletedTodoId,
          queryData.todos,
        );
        return R.assoc("todos", newTodos, queryData);
      });
    },
  });

  const [completeTodo, completeTodoResult] = useCompleteTodoMutation({
    update: (store, result) => {
      const completedTodo = result.data?.completeTodo.todo;
      if (!completedTodo) return;

      updateGetTodosQueryHelper(store, queryData => {
        const newTodos = R.map(
          todo =>
            todo.id === completedTodo.id
              ? R.assoc("isCompleted", true, todo)
              : todo,
          queryData.todos,
        );
        return R.assoc("todos", newTodos, queryData);
      });
    },
  });

  const [createTodo, createTodoResult] = useCreateTodoMutation({
    update: (store, result) => {
      const newTodo = result.data?.createTodo.todo;
      if (!newTodo) return;

      updateGetTodosQueryHelper(store, queryData => {
        const newTodos = R.append(newTodo, queryData.todos);
        return R.assoc("todos", newTodos, queryData);
      });
    },
  });

  // handlers
  const handleCreate = (content: string): void => {
    createTodo({ variables: { input: { content } } });
  };

  const handleDelete = (id: string): void => {
    deleteTodo({ variables: { input: { id } } });
  };

  const handleComplete = (id: string): void => {
    completeTodo({ variables: { input: { id } } });
  };

  // renders
  if (queryTodosResult.loading) return <>loading...</>;

  const error =
    queryTodosResult.error ||
    deleteTodoResult.error ||
    completeTodoResult.error ||
    createTodoResult.error;

  if (error) return <>error: {error.message}</>;

  const todos = queryTodosResult.data?.todos;
  if (!todos) return <></>;

  return (
    <>
      <CreateTodoForm onCreate={handleCreate} />
      <TodoList
        todos={todos}
        onComplete={handleComplete}
        onDelete={handleDelete}
      />
    </>
  );
};
