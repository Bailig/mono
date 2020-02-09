import React, { FC } from "react";
import { Todo } from "../../../generated/graphql";
import { TodoItem } from "./todo-item";

interface TodoListProps {
  todos?: Todo[];
  onDelete?: (id: string) => void;
  onComplete?: (id: string) => void;
}

export const TodoList: FC<TodoListProps> = ({
  todos = [],
  onDelete = () => {},
  onComplete = () => {},
}) => {
  return (
    <>
      {todos.map(todo => (
        <TodoItem
          key={todo.id}
          id={todo.id}
          content={todo.content}
          isCompleted={todo.isCompleted}
          onDelete={onDelete}
          onComplete={onComplete}
        />
      ))}
    </>
  );
};
