import { PageNotFound, ServerError } from "@shared/layouts";
import { Button, LoadingSpinner } from "@shared/ui";
import { IoArrowBackOutline } from "react-icons/io5";
import { useParams } from "react-router-dom";
import { TodoForm } from "../../forms/TodoForm";
import { useTodo } from "../../hooks/useTodo";

type TodoParams = {
  todoId: string;
};

export const EditTodoScreen = () => {
  const { todoId } = useParams<TodoParams>();

  const todo = useTodo(todoId);

  if (todo.loading.fetching) {
    return (
      <div className="h-72 w-full">
        <LoadingSpinner />
      </div>
    );
  }

  if (!todo.loading.fetching && todo.error) {
    return <ServerError />;
  }

  if (!todo.loading.fetching && !todo.data) {
    return <PageNotFound />;
  }

  return (
    <div className="flex flex-col gap-4 justify-center w-full">
      <Button className="size-fit flex items-center gap-1" to="/" transparent>
        <IoArrowBackOutline /> Back to home
      </Button>
      <TodoForm
        initData={todo.data}
        isSubmitting={todo.loading.updating}
        onSubmit={todo.update}
        onDelete={todo.delete}
      />
    </div>
  );
};
