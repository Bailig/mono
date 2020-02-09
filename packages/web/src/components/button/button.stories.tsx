import React, { FC } from "react";
import { Button } from "./button";

export default { title: "Button" };

export const WithText: FC = () => <Button>Hello Button</Button>;

export const WithEmoji: FC = () => (
  <Button>
    <span role="img" aria-label="so cool">
      😀 😎 👍 💯
    </span>
  </Button>
);
