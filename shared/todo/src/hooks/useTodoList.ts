import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";
import { debounce } from "throttle-debounce";
import { getTodoList } from "../api/todoRequests";
import { QueryKeys } from "../enums/QueryKeys";
import { TodoListParamsStatus } from "../schemas/TodoListParamsSchema";

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

  return {
    dataList: fetchingList.data ?? [],
    search: debounce(500, search),
    filters: {
      search: searchParams.get("search") ?? "",
      status: searchParams.get("status") ?? TodoListParamsStatus.ALL,
    },
    setFilters: setSearchParams,
    loading: {
      fetching: fetchingList.isLoading,
    },
    error: fetchingList.error,
    isSuccess: fetchingList.isSuccess,
  };
};
