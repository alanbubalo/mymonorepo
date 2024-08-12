import { twMerge } from "tailwind-merge";

interface ITextInputProps {
  name?: string;
  className?: string;
  placeholder?: string;
  defaultValue?: string;
  onSearch: (searchTerm: string) => void;
}

export const SearchBar = ({
  name = "search",
  className,
  defaultValue,
  placeholder = "Search...",
  onSearch,
}: ITextInputProps) => {
  return (
    <div className="flex flex-col gap-1 w-full">
      <input
        name={name}
        type="text"
        placeholder={placeholder}
        className={twMerge(
          "w-full border border-zinc-500 bg-zinc-200/10 text-zinc-50 focus:outline-none px-4 py-2 rounded-md",
          className,
        )}
        defaultValue={defaultValue}
        onChange={({ target }) => onSearch(target.value)}
      />
    </div>
  );
};
