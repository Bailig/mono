import React, { FC } from "react";

interface TodoItemProps {
  id: string;
  content: string;
  isCompleted: boolean;
  onComplete?: (id: string) => void;
  onDelete?: (id: string) => void;
}

export const TodoItem: FC<TodoItemProps> = ({
  id,
  content,
  isCompleted,
  onComplete = () => {},
  onDelete = () => {},
}) => {
  return (
    <div
      data-testid="todo"
      style={{
        margin: "24px",
        backgroundColor: isCompleted ? "gray" : "lightblue",
      }}
    >
      <div>{content}</div>
      <button type="button" onClick={() => onComplete(id)}>
        Complete
      </button>
      <button type="button" onClick={() => onDelete(id)}>
        Delete
      </button>
    </div>
  );
};
