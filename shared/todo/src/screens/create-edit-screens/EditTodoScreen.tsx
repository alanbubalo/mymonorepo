import { IoArrowBackOutline } from "react-icons/io5";
import { Link, useParams } from "react-router-dom";
import { TodoForm } from "../../forms/TodoForm";
import { useTodoStore } from "../../store/todoStore";
import { PageNotFound } from "../../../../../apps/main/src/screens/PageNotFound";
import { isValid } from "ulidx";

type TodoParams = {
  todoId: string;
};

export const EditTodoScreen = () => {
  const { todoId } = useParams<TodoParams>();
  const { updateTodo, getTodoById, deleteTodo } = useTodoStore();

  if (!todoId || !isValid(todoId)) {
    return <PageNotFound />;
  }

  const todo = getTodoById(todoId);

  if (!todo) {
    return <PageNotFound />;
  }

  return (
    <div className="flex flex-col gap-4 justify-center">
      <Link className="hover:text-zinc-300 size-fit flex items-center gap-1" to="/">
        <IoArrowBackOutline /> Back to home
      </Link>
      <TodoForm initData={todo} onSubmit={(newTodo) => updateTodo(newTodo, todoId)} onDelete={deleteTodo} />
    </div>
  );
};
