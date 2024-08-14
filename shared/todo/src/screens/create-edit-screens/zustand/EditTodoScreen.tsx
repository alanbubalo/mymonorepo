import { PageNotFound } from "@shared/layouts";
import { Button } from "@shared/ui";
import { useEffect } from "react";
import { IoArrowBackOutline } from "react-icons/io5";
import { useParams } from "react-router-dom";
import { TodoForm } from "../../../forms/TodoForm";
import { useTodoStore } from "../../../store/todoStore";

type TodoParams = {
  todoId: string;
};

export const EditTodoScreen = () => {
  const { todoId } = useParams<TodoParams>();

  const { getTodoById, updateTodo, deleteTodo, setTodoId } = useTodoStore();

  const todo = getTodoById(todoId);

  // biome-ignore lint/correctness/useExhaustiveDependencies: I want it to run only once regardless of renders
  useEffect(() => {
    if (todo) {
      setTodoId(todoId);
    }
  }, []);

  if (!todo) {
    return <PageNotFound />;
  }

  return (
    <div className="flex flex-col gap-4 justify-center w-full">
      <Button className="size-fit flex items-center gap-1" to="/" transparent>
        <IoArrowBackOutline className="size-4" /> Back to home
      </Button>
      <TodoForm initData={todo} onSubmit={updateTodo} onDelete={deleteTodo} />
    </div>
  );
};
