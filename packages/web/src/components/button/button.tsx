import React, { FC } from "react";

interface ButtonProps {
  onClick?: () => void;
}

export const Button: FC<ButtonProps> = ({ children, onClick }) => (
  <button type="button" onClick={onClick}>
    {children}
  </button>
);
