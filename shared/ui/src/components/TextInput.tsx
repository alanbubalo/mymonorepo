import { forwardRef } from "react";
import type { ChangeHandler, FieldError } from "react-hook-form";
import { twMerge } from "tailwind-merge";

interface ITextInputProps {
  label?: string;
  name?: string;
  className?: string;
  required?: boolean;
  placeholder?: string;
  defaultValue?: string;
  errors?: FieldError;
  onChange: ChangeHandler | (() => void);
  onBlur?: ChangeHandler;
}

export const TextInput = forwardRef<HTMLInputElement, ITextInputProps>(
  ({ label, name, required, className, defaultValue, placeholder, errors, onChange, onBlur }, ref) => {
    return (
      <div className="flex flex-col gap-1 w-full">
        {label && (
          <label className={`${errors && "text-red-600"}`}>
            {label} {required && <span className="text-red-500">*</span>}
          </label>
        )}
        <input
          ref={ref}
          name={name}
          type="text"
          placeholder={placeholder}
          className={twMerge(
            `w-full border border-zinc-500 bg-zinc-200/10 text-zinc-50 focus:outline-none px-4 py-2 rounded-md ${errors && "!bg-red-300/10 !text-red-600 !border-red-600"} ${className}`,
          )}
          defaultValue={defaultValue}
          onChange={onChange}
          onBlur={onBlur}
        />
        {errors?.message && <p className="text-red-500 text-sm">{errors?.message}</p>}
      </div>
    );
  },
);
