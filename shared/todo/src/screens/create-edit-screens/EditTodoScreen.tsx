import { IoArrowBackOutline } from "react-icons/io5";
import { useParams } from "react-router-dom";
import { TodoForm } from "../../forms/TodoForm";
import { useTodoStore } from "../../store/todoStore";
import { PageNotFound } from "../../../../../apps/main/src/screens/PageNotFound";
import { Button } from "@shared/ui";

type TodoParams = {
  todoId: string;
};

export const EditTodoScreen = () => {
  const { todoId } = useParams<TodoParams>();
  const { updateTodo, getTodoById, deleteTodo } = useTodoStore();

  const todo = getTodoById(todoId);

  return !todo ? (
    <PageNotFound />
  ) : (
    <div className="flex flex-col gap-4 justify-center">
      <Button className="size-fit flex items-center gap-1" to="/" transparent>
        <IoArrowBackOutline /> Back to home
      </Button>
      <TodoForm initData={todo} onSubmit={(newTodo) => updateTodo(newTodo, todo.id)} onDelete={deleteTodo} />
    </div>
  );
};
