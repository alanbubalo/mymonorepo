import { twMerge } from "tailwind-merge";

interface IButtonProps {
  children: React.ReactNode;
  type?: "button" | "submit" | "reset";
  onClick?: () => void;
  className?: string;
  disabled?: boolean;
}

export const Button = ({ children, type = "button", className = "", onClick, disabled }: IButtonProps) => {
  return (
    <button
      className={twMerge(`bg-zinc-600 text-zinc-50 px-4 py-2 rounded-md hover:bg-zinc-700 ${className}`)}
      onClick={onClick}
      type={type}
      disabled={disabled}
    >
      {children}
    </button>
  );
};
