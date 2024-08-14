import { useSearchParams } from "react-router-dom";
import { debounce } from "throttle-debounce";
import { TodoListParamsSchema } from "../schemas/TodoListParamsSchema";

export const useTodoFilters = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const filters = TodoListParamsSchema.parse({
    search: searchParams.get("search"),
    status: searchParams.get("status"),
  });

  const setFilters = ({ search, status }: { search?: string; status?: string }) => {
    const newSearch = new URLSearchParams(searchParams);
    if (search !== undefined) newSearch.set("search", search);
    if (status !== undefined) newSearch.set("status", status);
    setSearchParams(newSearch);
  };

  const search = debounce(500, (searchTerm: string) => {
    setFilters({ search: searchTerm });
  });

  return {
    search,
    filters,
    setFilters,
  };
};
