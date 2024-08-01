import { Link, useSearchParams } from "react-router-dom";
import { TodoCard } from "../../components/TodoCard";
import { useTodoStore } from "../../store/todoStore";
import { Button } from "@shared/ui";
import { getValidatedTodoListParams } from "../../utils/getValidatedTodoListParams";
import { SearchBarWithSelectFilter } from "@shared/ui";

const STATE_FILTER_OPTIONS = [
  {
    value: "all",
    label: "All",
  },
  {
    value: "pending",
    label: "Pending",
  },
  {
    value: "in_progress",
    label: "In progress",
  },
  {
    value: "done",
    label: "Done",
  },
];

export const TodoListScreen = () => {
  const { getFilteredTodoList } = useTodoStore();
  const [searchParams, setSearchParams] = useSearchParams();

  const validatedSearchParams = getValidatedTodoListParams(searchParams);

  const todoList = getFilteredTodoList(validatedSearchParams.search, validatedSearchParams.state);

  const search = (search: string, state: string) => {
    setSearchParams({ search, state });
  };

  return (
    <div className="flex flex-col gap-4">
      <Link to="/todo/create" className="size-fit">
        <Button>Create Todo</Button>
      </Link>
      <SearchBarWithSelectFilter
        filterValue={validatedSearchParams.state}
        searchQuery={validatedSearchParams.search}
        searchFn={search}
        optionsList={STATE_FILTER_OPTIONS}
      />
      <div className="flex flex-col gap-2 divide-y divide-zinc-600">
        {todoList.map((todo) => (
          <TodoCard key={todo.id} todo={todo} />
        ))}
      </div>
    </div>
  );
};
