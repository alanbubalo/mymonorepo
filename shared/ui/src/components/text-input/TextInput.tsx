import { type ChangeEvent, forwardRef } from "react";
import { twMerge } from "tailwind-merge";

interface ITextInputProps {
  className?: string;
  label?: string;
  name?: string;
  required: boolean;
  placeholder?: string;
  defaultValue?: string;
  errorMessage?: string;
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (event: ChangeEvent<HTMLInputElement>) => void;
}

export const TextInput = forwardRef<HTMLInputElement, ITextInputProps>(
  ({ className, label, name, required = false, defaultValue, placeholder, errorMessage, onChange, onBlur }, ref) => {
    return (
      <div className="flex flex-col gap-1 w-full">
        {label && (
          <label className={twMerge("text-zinc-50", errorMessage && "text-red-600")}>
            {label} {required && <span className="text-red-500">*</span>}
          </label>
        )}
        <input
          ref={ref}
          name={name}
          type="text"
          placeholder={placeholder}
          className={twMerge(
            "w-full border border-zinc-600 bg-zinc-600/50 text-zinc-50 focus:outline-none px-4 py-2 rounded-md text-base min-h-11",
            errorMessage && "!bg-red-300/10 !text-red-600 !border-red-600",
            className,
          )}
          defaultValue={defaultValue}
          onChange={onChange}
          onBlur={onBlur}
        />
        {errorMessage && <p className="text-red-600 text-sm">{errorMessage}</p>}
      </div>
    );
  },
);
