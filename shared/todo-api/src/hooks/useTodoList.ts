import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";
import { debounce } from "throttle-debounce";
import { getTodoList } from "../api/fakeApiRequest";

export const useTodoList = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const queryClient = useQueryClient();

  console.log("searchParams", searchParams);

  const fetchingList = useQuery({
    queryKey: ["todoList", searchParams],
    queryFn: async () => getTodoList(searchParams),
  });

  const search = (searchTerm: string) => {
    setSearchParams((prev) => {
      prev.set("search", searchTerm);
      return prev;
    });
    queryClient.invalidateQueries({ queryKey: ["todoList"] });
  };

  return {
    dataList: fetchingList.data ?? [],
    search: debounce(500, search),
    filters: searchParams,
    setFilters: setSearchParams,
    loading: {
      fetching: fetchingList.isLoading,
    },
  };
};
