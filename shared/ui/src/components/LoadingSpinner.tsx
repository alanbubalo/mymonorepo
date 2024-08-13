import { useMemo } from "react";
import { twMerge } from "tailwind-merge";

interface ILoadingSpinnerProps {
  size?: "xs" | "sm" | "md" | "lg" | "xl" | "2xl";
  color?: `border-t-${string}-${number}`;
  className?: string;
}

export const LoadingSpinner = ({ size = "2xl", color, className }: ILoadingSpinnerProps) => {
  const sizeStyles = useMemo(() => {
    const defaultSize = "w-14 h-14 border-4";

    const selectedSize = {
      "2xl": defaultSize,
      xl: "w-10 h-10 border-4",
      lg: "w-8 h-8 border-4",
      md: "w-6 h-6 border-2",
      sm: "w-4 h-4 border-2",
      xs: "w-2 h-2 border",
    }[size];

    if (!selectedSize) {
      return defaultSize;
    }

    return selectedSize;
  }, [size]);

  return (
    <div className="flex h-full w-full items-center justify-center">
      <div
        className={twMerge(
          "w-14 h-14 border-4 animate-spin rounded-full",
          sizeStyles,
          color || "border-t-blue-600",
          className,
        )}
      ></div>
    </div>
  );
};
