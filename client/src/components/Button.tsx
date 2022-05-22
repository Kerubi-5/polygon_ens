import { ButtonHTMLAttributes, FC } from "react";

interface IButton extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

const Button: FC<IButton> = ({ children, ...rest }) => {
  return (
    <button
      className="font-semibold bg-gradient-to-r from-orange-500 to-yellow-500 text-yellow-50 py-2 px-4 rounded-lg"
      {...rest}
    >
      {children}
    </button>
  );
};

export default Button;
