import { FC } from "react";

interface Props {
  condition: boolean;
  children: JSX.Element | (JSX.Element | null)[];
}

export const Conditional: FC<Props> = ({ condition, children }) =>
  condition ? <>{children}</> : null;
