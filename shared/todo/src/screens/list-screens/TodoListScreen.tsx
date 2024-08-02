import { Link, useSearchParams } from "react-router-dom";
import { TodoCard } from "../../components/TodoCard";
import { useTodoStore } from "../../store/todoStore";
import { Button } from "@shared/ui";
import { getValidatedTodoListParams } from "../../utils/getValidatedTodoListParams";
import { SearchBarWithSelectFilter } from "@shared/ui";
import { IoIosCheckmark } from "react-icons/io";

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

  const todoList = getFilteredTodoList(validatedSearchParams);

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
        {todoList.length > 0 ? (
          todoList.map((todo) => <TodoCard key={todo.id} todo={todo} />)
        ) : (
          <div className="flex flex-col justify-center items-center max-w-72 mx-auto mt-10">
            <IoIosCheckmark className="size-32 " />

            <h2 className="text-lg text-center">No tasks found!?</h2>
            <p className="text-zinc-400 text-center mt-1">What a great day.</p>
          </div>
        )}
      </div>
    </div>
  );
};
