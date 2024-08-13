import { Button } from "@shared/ui";
import { IoArrowBackOutline } from "react-icons/io5";
import { TodoForm } from "../../forms/TodoForm";
import { useTodo } from "../../hooks/useTodo";

export const CreateTodoScreen = () => {
  const todo = useTodo();

  return (
    <div className="flex flex-col gap-4 justify-center w-full">
      <Button className="size-fit flex items-center gap-1" to="/" transparent>
        <IoArrowBackOutline /> Back to home
      </Button>
      <TodoForm onSubmit={todo.create} isSubmitting={todo.loading.creating} />
    </div>
  );
};
