// import { Link } from "react-router-dom";
import { IoArrowBackOutline } from "react-icons/io5";
import { TodoForm } from "../../forms/TodoForm";
import { useTodoStore } from "../../store/todoStore";
import { Button } from "@shared/ui";

export const CreateTodoScreen = () => {
  const { createTodo } = useTodoStore();

  return (
    <div className="flex flex-col gap-4 justify-center">
      <Button className="size-fit flex items-center gap-1" to="/" transparent>
        <IoArrowBackOutline /> Back to home
      </Button>
      <TodoForm onSubmit={createTodo} />
    </div>
  );
};
