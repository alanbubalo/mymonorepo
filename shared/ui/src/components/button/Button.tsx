import { twMerge } from "tailwind-merge";
import { Link } from "react-router-dom";

interface IButtonProps {
  children: React.ReactNode;
  className?: string;
  type?: "button" | "submit" | "reset";
  to?: string;
  variant?: "primary" | "transparent";
  disabled?: boolean;
  onClick?: () => void;
}

export const Button = ({
  children,
  className,
  type = "button",
  to,
  variant = "primary",
  disabled,
  onClick,
}: IButtonProps) => {
  const buttonClass = twMerge(
    "duration-200 transition-all px-4 py-2 rounded-md",
    to && "inline-block",
    variant === "primary" && "bg-zinc-600 text-zinc-50 hover:bg-zinc-700",
    variant === "transparent" && "bg-transparent text-zinc-50 hover:bg-zinc-600/50",
    disabled && "opacity-75 pointer-events-none",
    className,
  );

  return to ? (
    <Link to={to} className={buttonClass} aria-disabled={disabled}>
      {children}
    </Link>
  ) : (
    <button className={buttonClass} onClick={onClick} type={type} aria-disabled={disabled}>
      {children}
    </button>
  );
};
