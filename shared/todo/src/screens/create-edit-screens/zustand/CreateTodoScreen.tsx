import { Button } from "@shared/ui";
import { IoArrowBackOutline } from "react-icons/io5";
import { TodoForm } from "../../../forms/TodoForm";
import { useTodoStore } from "../../../store/todoStore";

export const CreateTodoScreen = () => {
  const { createTodo } = useTodoStore();

  return (
    <div className="flex flex-col gap-4 justify-center w-full">
      <Button className="size-fit flex items-center gap-1" to="/" transparent>
        <IoArrowBackOutline className="size-4" /> Back to home
      </Button>
      <TodoForm onSubmit={createTodo} />
    </div>
  );
};
