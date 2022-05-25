import { ButtonHTMLAttributes, FC } from "react";

interface IButton extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: "primary" | "disabled";
}

const Button: FC<IButton> = ({ children, variant = "primary", ...rest }) => {
  const isPrimary = variant === "primary";
  return (
    <button
      className={`${
        isPrimary
          ? " bg-gradient-to-r from-orange-500 to-yellow-500 "
          : "bg-gray-500"
      } font-semibold py-2 px-4 rounded-lg text-yellow-50`}
      {...rest}
      disabled={!isPrimary}
    >
      {children}
    </button>
  );
};

export default Button;
