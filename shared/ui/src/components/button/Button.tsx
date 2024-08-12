import { twMerge } from "tailwind-merge";
import { Link } from "react-router-dom";

interface IButtonProps {
  children: React.ReactNode;
  className?: string;
  type?: "button" | "submit" | "reset";
  to?: string;
  variant: "primary" | "danger";
  transparent: boolean;
  disabled: boolean;
  onClick?: () => void;
}

export const Button = ({
  children,
  className,
  to,
  onClick,
  type = "button",
  variant = "primary",
  transparent = false,
  disabled = false,
}: IButtonProps) => {
  const buttonClass = twMerge(
    "duration-200 transition-all px-4 py-2 rounded-md",
    to && "inline-block",
    variant === "primary" && transparent && "bg-transparent text-blue-500 hover:bg-blue-600/25",
    variant === "danger" && transparent && "bg-transparent text-red-500 hover:bg-red-600/25",
    variant === "primary" && !transparent && "bg-blue-500 text-blue-50 hover:bg-blue-600",
    variant === "danger" && !transparent && "bg-red-500 text-red-50 hover:bg-red-600",
    disabled && "opacity-75 pointer-events-none",
    className,
  );

  return to ? (
    <Link to={to} className={buttonClass} aria-disabled={disabled}>
      {children}
    </Link>
  ) : (
    <button className={buttonClass} onClick={onClick} type={type ?? "button"} aria-disabled={disabled}>
      {children}
    </button>
  );
};
