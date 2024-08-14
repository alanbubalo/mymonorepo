import { CreateEditLayout } from "@shared/layouts";
import { TodoForm } from "../../../forms/TodoForm";
import { useTodoStore } from "../../../store/todoStore";

export const CreateTodoScreen = () => {
  const { createTodo } = useTodoStore();

  return (
    <CreateEditLayout>
      <TodoForm onSubmit={createTodo} />
    </CreateEditLayout>
  );
};
