import { CreateEditLayout, PageNotFound, ServerError } from "@shared/layouts";
import { LoadingSpinner } from "@shared/ui";
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

  if (todo.isError) {
    return <ServerError />;
  }

  if (!todo.data) {
    return <PageNotFound />;
  }

  return (
    <CreateEditLayout>
      <TodoForm
        initData={todo.data}
        isSubmitting={todo.loading.updating}
        onSubmit={todo.update}
        onDelete={todo.delete}
      />
    </CreateEditLayout>
  );
};
