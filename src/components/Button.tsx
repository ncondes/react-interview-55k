import { ButtonHTMLAttributes, FC, PropsWithChildren } from "react";

interface Props
  extends PropsWithChildren,
    ButtonHTMLAttributes<HTMLButtonElement> {}

export const Button: FC<Props> = ({ children, ...attributes }) => {
  return (
    <button className="button" {...attributes}>
      {children}
    </button>
  );
};
