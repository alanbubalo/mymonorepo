import { Button, SearchBar, Select } from "@shared/ui";
import { EmptyTodoList } from "../../components/EmptyTodoList";
import { TodoCard } from "../../components/TodoCard";
import { statusFilterOptions } from "../../data/statusOptions";
import { useTodoStore } from "../../store/todoStore";
import { useSearchParams } from "react-router-dom";
import { TodoListParamsSchema } from "../../schemas/TodoListParamsSchema";

export const TodoListScreen = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const search = (searchTerm: string) => {
    setSearchParams((prev) => {
      prev.set("search", searchTerm);
      return prev;
    });
  };

  const filters = TodoListParamsSchema.parse({
    search: searchParams.get("search"),
    status: searchParams.get("status"),
  });

  const setFilters = ({ search, status }: { search?: string; status?: string }) => {
    const newSearch = new URLSearchParams(searchParams);
    if (search) newSearch.set("search", search);
    if (status) newSearch.set("status", status);
    setSearchParams(newSearch);
  };

  const { getTodoList } = useTodoStore((state) => state);

  const todoList = getTodoList(filters);

  return (
    <div className="flex flex-col gap-4 flex-1">
      <Button to="/todo/create" className="size-fit">
        Create Todo
      </Button>
      <div className="flex flex-col gap-3 sm:flex-row">
        <SearchBar onSearch={(searchTerm) => search(searchTerm)} defaultValue={filters.search} />
        <Select
          name="status-filter"
          className="sm:w-56"
          onChange={({ target }) => setFilters({ status: target.value })}
          defaultValue={filters.status}
          optionsList={statusFilterOptions}
        />
      </div>
      {todoList.length === 0 ? (
        <EmptyTodoList />
      ) : (
        <div className="flex flex-col gap-2 divide-y divide-zinc-600">
          {todoList.map((todo) => (
            <TodoCard key={todo.id} todo={todo} />
          ))}
        </div>
      )}
    </div>
  );
};
