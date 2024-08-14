import { ServerError } from "@shared/layouts";
import { Button, LoadingSpinner, SearchBar, Select } from "@shared/ui";
import { EmptyTodoList } from "../../components/EmptyTodoList";
import { TodoCard } from "../../components/TodoCard";
import { statusFilterOptions } from "../../data/statusOptions";
import { useTodoList } from "../../hooks/useTodoList";

export const TodoListScreen = () => {
  const { dataList, filters, setFilters, search, loading, error } = useTodoList();

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
      {loading.fetching ? (
        <div className="h-72">
          <LoadingSpinner />
        </div>
      ) : error ? (
        <ServerError />
      ) : dataList.length === 0 ? (
        <EmptyTodoList />
      ) : (
        <div className="flex flex-col gap-2 divide-y divide-zinc-600">
          {dataList.map((todo) => (
            <TodoCard key={todo.id} todo={todo} />
          ))}
        </div>
      )}
    </div>
  );
};
