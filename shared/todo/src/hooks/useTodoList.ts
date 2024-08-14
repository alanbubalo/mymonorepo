import { useQuery } from "@tanstack/react-query";
import { getTodoListAsync } from "../api/todoRequests";
import { QueryKeys } from "../enums/QueryKeys";
import { useTodoFilters } from "./useTodoFilters";

export const useTodoList = () => {
  const { search, filters, setFilters } = useTodoFilters();

  const fetchingList = useQuery({
    queryKey: [QueryKeys.TODO_LIST, filters],
    queryFn: async () => getTodoListAsync(filters),
  });

  return {
    dataList: fetchingList.data ?? [],
    search,
    filters,
    setFilters,
    loading: {
      fetching: fetchingList.isLoading,
    },
    error: fetchingList.error,
    isSuccess: fetchingList.isSuccess,
  };
};
