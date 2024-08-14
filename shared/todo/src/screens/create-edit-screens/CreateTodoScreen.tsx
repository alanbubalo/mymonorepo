import { CreateEditLayout } from "@shared/layouts";
import { TodoForm } from "../../forms/TodoForm";
import { useTodo } from "../../hooks/useTodo";

export const CreateTodoScreen = () => {
  const todo = useTodo();

  return (
    <CreateEditLayout>
      <TodoForm onSubmit={todo.create} />
    </CreateEditLayout>
  );
};
