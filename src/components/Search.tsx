import { FC } from "react";

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {}

export const Search: FC<Props> = ({ ...attributes }) => {
  return <input className="input" {...attributes} />;
};
