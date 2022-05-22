import { FC, InputHTMLAttributes } from "react";

interface IInput extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

const Input: FC<IInput> = ({ label, type = "text", className, ...rest }) => {
  return (
    <div className={`bg-white py-2 px-4 flex rounded-lg gap-1 ${className}`}>
      <input className="flex-grow outline-none" type={type} {...rest} />
      <span className="font-semibold">{label}</span>
    </div>
  );
};

export default Input;
