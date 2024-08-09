import { Link, useSearchParams } from "react-router-dom";
import { TodoCard } from "../../components/TodoCard";
import { useTodoStore } from "../../store/todoStore";
import { Button } from "@shared/ui";
import { IoIosCheckmark } from "react-icons/io";
import { TodoFilter } from "../../components/TodoFilter";
import { TodoListParamsSchema } from "../../schemas/TodoListParamsSchema";

export const TodoListScreen = () => {
  const { getFilteredTodoList } = useTodoStore();
  const [searchParams, setSearchParams] = useSearchParams();

  const validatedSearchParams = TodoListParamsSchema.parse({
    search: searchParams.get("search"),
    status: searchParams.get("status"),
  });

  const todoList = getFilteredTodoList(validatedSearchParams);

  return (
    <div className="flex flex-col gap-4">
      <Link to="/todo/create" className="size-fit">
        <Button>Create Todo</Button>
      </Link>
      <TodoFilter searchParams={validatedSearchParams} setSearchParams={setSearchParams} />
      <div className="flex flex-col gap-2 divide-y divide-zinc-600">
        {todoList.length === 0 ? (
          <div className="flex flex-col justify-center items-center max-w-72 mx-auto mt-10">
            <IoIosCheckmark className="size-32 " />
            <h2 className="text-lg text-center">No tasks found!?</h2>
            <p className="text-zinc-400 text-center mt-1">What a great day.</p>
          </div>
        ) : (
          todoList.map((todo) => <TodoCard key={todo.id} todo={todo} />)
        )}
      </div>
    </div>
  );
};
