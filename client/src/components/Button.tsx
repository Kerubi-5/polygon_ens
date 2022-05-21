import { ButtonHTMLAttributes, FC } from "react";

interface IButton extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

const Button: FC<IButton> = ({ children, ...rest }) => {
  return (
    <button className="" {...rest}>
      {children}
    </button>
  );
};

export default Button;
