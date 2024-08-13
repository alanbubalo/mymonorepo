import { Link } from "react-router-dom";
import { TodoCard } from "../../components/TodoCard";
import { Button, LoadingSpinner } from "@shared/ui";
import { useTodoList } from "../../hooks/useTodoList";
import { EmptyTodoList } from "../../components/EmptyTodoList";

import { SearchBar } from "@shared/ui";
import { Select } from "@shared/ui";
import { ServerError } from "@shared/layouts";
import { statusFilterOptions } from "../../data/statusOptions";

export const TodoListScreen = () => {
  const { dataList, filters, setFilters, search, loading, error } = useTodoList();

  return (
    <div className="flex flex-col gap-4 flex-1">
      <Link to="/todo/create" className="size-fit">
        <Button>Create Todo</Button>
      </Link>
      <div className="flex gap-3 items-stretch flex-col sm:flex-row">
        <SearchBar onSearch={(searchTerm) => search(searchTerm)} defaultValue={filters.search} />
        <Select
          name="status-filter"
          className="sm:w-56"
          onChange={({ target }) =>
            setFilters((prev) => {
              prev.set("status", target.value);
              return prev;
            })
          }
          defaultValue={filters.status}
          optionsList={statusFilterOptions}
        />
      </div>
      {loading.fetching && (
        <div className="h-72">
          <LoadingSpinner />
        </div>
      )}
      {!loading.fetching && error ? (
        <ServerError />
      ) : !loading.fetching && dataList.length === 0 ? (
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
