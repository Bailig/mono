import React, { FC, FormEvent, useState } from "react";

interface CreateTodoFormProps {
  onCreate?: (content: string) => void;
}

export const CreateTodoForm: FC<CreateTodoFormProps> = ({
  onCreate = () => {},
}) => {
  const [content, setContent] = useState("");

  const handleSubmit = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    onCreate(content);
    setContent("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={content}
        onChange={e => setContent(e.target.value)}
      />
      <input type="submit" value="+" />
    </form>
  );
};
