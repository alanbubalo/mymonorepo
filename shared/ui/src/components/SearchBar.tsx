import { forwardRef } from "react";
import { twMerge } from "tailwind-merge";

interface ITextInputProps {
  name?: string;
  className?: string;
  placeholder?: string;
  defaultValue?: string;
  onSearch: (searchTerm: string) => void;
  onBlur?: () => void;
}

export const SearchBar = forwardRef<HTMLInputElement, ITextInputProps>(
  ({ name = "search", className, defaultValue, placeholder, onSearch, onBlur }, ref) => {
    return (
      <div className="flex flex-col gap-1 w-full">
        <input
          ref={ref}
          name={name}
          type="text"
          placeholder={placeholder}
          className={twMerge(
            "w-full border border-zinc-500 bg-zinc-200/10 text-zinc-50 focus:outline-none px-4 py-2 rounded-md",
            className,
          )}
          defaultValue={defaultValue}
          onChange={({ target }) => onSearch(target.value)}
          onBlur={onBlur}
        />
      </div>
    );
  },
);
