import { ButtonHTMLAttributes, FC } from "react";
import Loader from "./Loader";

interface IButton extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: "primary" | "disabled";
  loading?: boolean;
}

const Button: FC<IButton> = ({
  children,
  variant = "primary",
  loading = false,
  ...rest
}) => {
  const isPrimary = variant === "primary";
  return (
    <button
      className={`${
        isPrimary
          ? " bg-gradient-to-r from-orange-500 to-yellow-500"
          : "bg-gray-500 py-4"
      } font-semibold py-2 px-4 rounded-lg text-yellow-50 flex justify-center`}
      {...rest}
      disabled={!isPrimary}
    >
      {loading ? <Loader /> : children}
    </button>
  );
};

export default Button;
