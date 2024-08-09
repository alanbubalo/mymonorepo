import type { SetURLSearchParams } from "react-router-dom";
import { SearchBar } from "@shared/ui";
import { Select } from "@shared/ui";
import { debounce } from "throttle-debounce";
import { useRef } from "react";
import { type TTodoListParams, TodoListParamsStatus } from "../schemas/TodoListParamsSchema";

const statusFilterOptions = [
  {
    value: TodoListParamsStatus.ALL,
    label: "All",
  },
  {
    value: TodoListParamsStatus.PENDING,
    label: "Pending",
  },
  {
    value: TodoListParamsStatus.IN_PROGRESS,
    label: "In progress",
  },
  {
    value: TodoListParamsStatus.DONE,
    label: "Done",
  },
];

interface ITodoFilterProps {
  searchParams: TTodoListParams;
  setSearchParams: SetURLSearchParams;
}

export const TodoFilter = ({ searchParams, setSearchParams }: ITodoFilterProps) => {
  const debouncedHandleSearchQuery = debounce(500, (searchTerm: string) => {
    setSearchParams((prev) => {
      prev.set("search", searchTerm);
      return prev;
    });
  });

  const selectRef = useRef<HTMLSelectElement>(null);
  const handleStatusFilter = () => {
    setSearchParams((prev) => {
      prev.set("status", selectRef.current?.value ?? "all");
      return prev;
    });
  };

  return (
    <div className="flex gap-3 items-stretch flex-col sm:flex-row">
      <SearchBar onSearch={(searchTerm) => debouncedHandleSearchQuery(searchTerm)} defaultValue={searchParams.search} />
      <Select
        ref={selectRef}
        name="searchbar-filter"
        className="sm:w-56"
        onChange={handleStatusFilter}
        defaultValue={searchParams.status}
      >
        {statusFilterOptions.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </Select>
    </div>
  );
};
