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
    <input
      name={name}
      type="text"
      placeholder={placeholder}
      className={twMerge(
        "inline-block w-full bg-zinc-600/50 text-zinc-50 border border-zinc-600 focus:outline-none px-4 py-2 rounded-md min-h-11",
        className,
      )}
      defaultValue={defaultValue}
      onChange={({ target }) => onSearch(target.value)}
    />
  );
};
