import { useRef } from "react";
import { debounce } from "throttle-debounce";
import { TextInput } from "@shared/ui";
import { Select } from "@shared/ui";

interface ISearchProps {
  searchQuery: string;
  filterValue: string;
  searchFn: (searchTerm: string, filterState: string) => void;
  optionsList: { value: string; label: string }[];
}

export const SearchBarWithSelectFilter = ({ searchQuery, filterValue, searchFn, optionsList }: ISearchProps) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const selectRef = useRef<HTMLSelectElement>(null);

  const handleSearch = () => {
    searchFn(inputRef.current?.value ?? "", selectRef.current?.value ?? "");
  };

  return (
    <div className="flex gap-3 items-stretch">
      <TextInput
        ref={inputRef}
        name="searchbar"
        onChange={() => debounce(500, handleSearch)()}
        defaultValue={searchQuery}
        placeholder="Search..."
      />
      <Select
        ref={selectRef}
        name="searchbar-filter"
        className="w-56"
        onChange={handleSearch}
        defaultValue={filterValue}
      >
        {optionsList.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </Select>
    </div>
  );
};
