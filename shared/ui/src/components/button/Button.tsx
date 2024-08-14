import { Link } from "react-router-dom";
import { twMerge } from "tailwind-merge";
import { LoadingSpinner } from "../LoadingSpinner";

interface IButtonProps {
  children: React.ReactNode;
  className?: string;
  type?: "button" | "submit" | "reset";
  to?: string;
  variant?: "primary" | "danger";
  transparent?: boolean;
  disabled?: boolean;
  isLoading?: boolean;
  icon?: React.ReactNode;
  onClick?: () => void;
}

export const Button = ({
  children,
  className,
  to,
  onClick,
  icon,
  type = "button",
  variant = "primary",
  transparent = false,
  disabled = false,
  isLoading = false,
}: IButtonProps) => {
  const buttonClass = twMerge(
    "relative duration-200 h-fit transition-all px-4 py-2 rounded-md flex items-center gap-2",
    to && "inline-block",
    variant === "primary" && transparent && "bg-transparent text-blue-500 hover:bg-blue-600/25",
    variant === "danger" && transparent && "bg-transparent text-red-500 hover:bg-red-600/25",
    variant === "primary" && !transparent && "bg-blue-500 text-blue-50 hover:bg-blue-600",
    variant === "danger" && !transparent && "bg-red-500 text-red-50 hover:bg-red-600",
    disabled && "opacity-75 pointer-events-none",
    isLoading && "pointer-events-none text-transparent",
    className,
  );

  return to ? (
    <Link to={to} className={buttonClass} aria-disabled={disabled}>
      {icon}
      {children}
      {isLoading && <LoadingSpinner size="sm" color="border-t-blue-600" />}
    </Link>
  ) : (
    <button className={buttonClass} onClick={onClick} type={type ?? "button"} aria-disabled={disabled}>
      {icon}
      {children}
      {isLoading && (
        <div className="absolute inset-0">
          {" "}
          <LoadingSpinner size="sm" color="border-t-zinc-600/50" />
        </div>
      )}
    </button>
  );
};
