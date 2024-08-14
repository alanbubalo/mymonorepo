import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";
import { debounce } from "throttle-debounce";
import { getTodoList } from "../api/todoRequests";
import { QueryKeys } from "../enums/QueryKeys";
import { TodoListParamsSchema } from "../schemas/TodoListParamsSchema";

export const useTodoList = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const fetchingList = useQuery({
    queryKey: [QueryKeys.TODO_LIST, searchParams.toString()],
    queryFn: async () => getTodoList(searchParams),
  });

  const search = (searchTerm: string) => {
    setSearchParams((prev) => {
      prev.set("search", searchTerm);
      return prev;
    });
  };

  const setFilters = ({ search, status }: { search?: string; status?: string }) => {
    const newSearch = new URLSearchParams(searchParams);
    if (search) newSearch.set("search", search);
    if (status) newSearch.set("status", status);
    setSearchParams(newSearch);
  };

  return {
    dataList: fetchingList.data ?? [],
    search: debounce(500, search),
    filters: TodoListParamsSchema.parse({
      search: searchParams.get("search"),
      status: searchParams.get("status"),
    }),
    setFilters,
    loading: {
      fetching: fetchingList.isLoading,
    },
    error: fetchingList.error,
    isSuccess: fetchingList.isSuccess,
  };
};
