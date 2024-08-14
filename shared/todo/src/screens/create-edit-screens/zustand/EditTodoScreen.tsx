import { CreateEditLayout, PageNotFound } from "@shared/layouts";
import { useEffect } from "react";
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
    <CreateEditLayout>
      <TodoForm initData={todo} onSubmit={updateTodo} onDelete={deleteTodo} />
    </CreateEditLayout>
  );
};
