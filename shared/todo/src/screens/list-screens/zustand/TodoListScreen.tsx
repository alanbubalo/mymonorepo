import { Button, SearchBar, Select } from "@shared/ui";
import { EmptyTodoList } from "../../../components/EmptyTodoList";
import { TodoCard } from "../../../components/TodoCard";
import { statusFilterOptions } from "../../../data/statusOptions";
import { useTodoFilters } from "../../../hooks/useTodoFilters";
import { useTodoStore } from "../../../store/todoStore";

export const TodoListScreen = () => {
  const { search, filters, setFilters } = useTodoFilters();

  const { getTodoList } = useTodoStore();

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
