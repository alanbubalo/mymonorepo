import type { SetURLSearchParams } from "react-router-dom";
import { SearchBar } from "@shared/ui";
import { Select } from "@shared/ui";
import { debounce } from "throttle-debounce";
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

  const handleStatusFilter = (status: string) => {
    setSearchParams((prev) => {
      prev.set("status", status);
      return prev;
    });
  };

  return (
    <div className="flex gap-3 items-stretch flex-col sm:flex-row">
      <SearchBar onSearch={(searchTerm) => debouncedHandleSearchQuery(searchTerm)} defaultValue={searchParams.search} />
      <Select
        name="searchbar-filter"
        className="sm:w-56"
        onChange={(event) => handleStatusFilter(event.target.value)}
        defaultValue={searchParams.status}
        optionsList={statusFilterOptions}
      />
    </div>
  );
};
