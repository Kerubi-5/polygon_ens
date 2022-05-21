import { FC, ReactNode } from "react";

const Container: FC<{ children: ReactNode }> = ({ children }) => {
  return <div className="container mx-auto px-4">{children}</div>;
};

export default Container;
