import { Link } from "react-router-dom";
import { IoArrowBackOutline } from "react-icons/io5";
import { TodoForm } from "../../forms/TodoForm";
import { useTodoStore } from "../../store/todoStore";

export const CreateTodoScreen = () => {
  const { createTodo } = useTodoStore();

  return (
    <div className="flex flex-col gap-4 justify-center">
      <Link
        className="hover:text-zinc-300 size-fit flex items-center gap-1"
        to="/"
      >
        <IoArrowBackOutline /> Back to home
      </Link>
      <TodoForm onSubmit={createTodo} />
    </div>
  );
};
