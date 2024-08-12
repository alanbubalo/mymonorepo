import type { ChangeHandler } from "react-hook-form";
import { forwardRef } from "react";
import { twMerge } from "tailwind-merge";

interface ISelectProps {
  className?: string;
  disabled?: boolean;
  label?: string;
  name?: string;
  required?: boolean;
  defaultValue: string;
  errorMessage?: string;
  onChange: ChangeHandler | (() => void);
  onBlur?: ChangeHandler;
  children: React.ReactNode;
}

export const Select = forwardRef<HTMLSelectElement, ISelectProps>(
  (
    { className, disabled = false, label, name, required, defaultValue, errorMessage, onChange, onBlur, children },
    ref,
  ) => {
    return (
      <div className={`flex flex-col gap-1 ${disabled && "pointer-events-none opacity-65"}`}>
        {label && (
          <label className={twMerge("text-zinc-50", errorMessage && "text-red-600")}>
            {label} {required && <span className="text-red-600">*</span>}
          </label>
        )}
        <select
          ref={ref}
          name={name}
          className={twMerge(
            "w-full border border-zinc-600 bg-zinc-200/10 text-zinc-50 focus:outline-none px-4 py-2 rounded-md h-10",
            errorMessage && "!bg-red-300/10 !text-red-600 !border-red-600",
            className,
          )}
          defaultValue={defaultValue}
          tabIndex={!disabled ? 0 : -1}
          onChange={onChange}
          onBlur={onBlur}
        >
          {children}
        </select>
        {errorMessage && <p className="text-red-600 text-sm">{errorMessage}</p>}
      </div>
    );
  },
);
