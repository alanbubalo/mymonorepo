// import { Link, useSearchParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { TodoCard } from "../../components/TodoCard";
// import { useTodoStore } from "../../store/todoStore";
import { Button } from "@shared/ui";
import { IoIosCheckmark } from "react-icons/io";
// import { TodoFilter } from "../../components/TodoFilter";
// import { TodoListParamsSchema } from "../../schemas/TodoListParamsSchema";
import { useTodoList } from "@shared/todo-api";

import { SearchBar } from "@shared/ui";
import { Select } from "@shared/ui";
import { TodoListParamsStatus } from "../../schemas/TodoListParamsSchema";

const statusFilterOptions = [
  {
    value: TodoListParamsStatus.ALL,
    label: "All",
  },
  {
    value: TodoListParamsStatus.PENDING,
    label: "Pending",
  },
  {
    value: TodoListParamsStatus.IN_PROGRESS,
    label: "In progress",
  },
  {
    value: TodoListParamsStatus.DONE,
    label: "Done",
  },
];

export const TodoListScreen = () => {
  // const { getFilteredTodoList } = useTodoStore();
  // const [searchParams, setSearchParams] = useSearchParams();

  // const validatedSearchParams = TodoListParamsSchema.parse({
  //   search: searchParams.get("search"),
  //   status: searchParams.get("status"),
  // });

  // const todoList = getFilteredTodoList(validatedSearchParams);

  const { dataList, filters, setFilters, search } = useTodoList();

  return (
    <div className="flex flex-col gap-4">
      <Link to="/todo/create" className="size-fit">
        <Button>Create Todo</Button>
      </Link>
      {/* <TodoFilter searchParams={filters} setSearchParams={setFilters} /> */}
      <div className="flex gap-3 items-stretch flex-col sm:flex-row">
        <SearchBar onSearch={(searchTerm) => search(searchTerm)} defaultValue={filters.search} />
        <Select
          name="searchbar-filter"
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
      <div className="flex flex-col gap-2 divide-y divide-zinc-600">
        {dataList.length === 0 ? (
          <div className="flex flex-col justify-center items-center max-w-72 mx-auto mt-10">
            <IoIosCheckmark className="size-32 " />
            <h2 className="text-lg text-center">No tasks found!?</h2>
            <p className="text-zinc-400 text-center mt-1">What a great day.</p>
          </div>
        ) : (
          dataList.map((todo) => <TodoCard key={todo.id} todo={todo} />)
        )}
      </div>
    </div>
  );
};
