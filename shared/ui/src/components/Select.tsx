import type { ChangeHandler, FieldError } from "react-hook-form";
import { forwardRef } from "react";
import { twMerge } from "tailwind-merge";

interface ISelectProps {
  disabled?: boolean;
  label?: string;
  name?: string;
  defaultValue: string;
  className?: string;
  errors?: FieldError;
  onChange: ChangeHandler | (() => void);
  onBlur?: ChangeHandler;
  children: React.ReactNode;
}

export const Select = forwardRef<HTMLSelectElement, ISelectProps>(
  ({ disabled = false, label, name, defaultValue, className, errors, onChange, onBlur, children }, ref) => {
    return (
      <div className={`flex flex-col gap-1 ${disabled && "pointer-events-none opacity-65"}`}>
        {label && (
          <label>
            {label} <span className="text-red-500">*</span>
          </label>
        )}
        <select
          ref={ref}
          name={name}
          className={twMerge(
            `w-full border border-zinc-500 bg-zinc-200/10 text-zinc-50 focus:outline-none px-4 py-2 rounded-md h-10 ${className}`,
          )}
          defaultValue={defaultValue}
          tabIndex={!disabled ? 0 : -1}
          onChange={onChange}
          onBlur={onBlur}
        >
          {children}
        </select>
        {errors?.message && <p className="text-red-500 text-sm">{errors?.message}</p>}
      </div>
    );
  },
);
