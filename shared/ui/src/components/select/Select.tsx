import { type ChangeEvent, forwardRef } from "react";
import { twMerge } from "tailwind-merge";

interface ISelectProps {
  className?: string;
  disabled?: boolean;
  label?: string;
  name?: string;
  required?: boolean;
  defaultValue?: string;
  errorMessage?: string;
  optionsList: { value: string; label: string }[];
  onChange: (event: ChangeEvent<HTMLSelectElement>) => void;
  onBlur?: (event: ChangeEvent<HTMLSelectElement>) => void;
}

export const Select = forwardRef<HTMLSelectElement, ISelectProps>(
  (
    {
      className,
      disabled = false,
      label,
      name,
      required = false,
      defaultValue,
      errorMessage,
      onChange,
      onBlur,
      optionsList = [],
    },
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
            "w-full border border-zinc-600 bg-zinc-600/50 text-zinc-50 focus:outline-none px-4 py-2 rounded-md text-base min-h-11",
            errorMessage && "!bg-red-300/10 !text-red-600 !border-red-600",
            className,
          )}
          defaultValue={defaultValue}
          tabIndex={disabled ? -1 : 0}
          onChange={onChange}
          onBlur={onBlur}
        >
          {optionsList.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        {errorMessage && <p className="text-red-600 text-sm">{errorMessage}</p>}
      </div>
    );
  },
);
