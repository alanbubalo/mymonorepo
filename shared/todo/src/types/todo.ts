import type { TTodoFormData } from "../schemas/TodoFormSchema";
import type { TTodoState } from "../enums/TodoState";
import type { TTodoListParams } from "../schemas/TodoListParamsSchema";

export type TTodo = {
  id: string;
  state: TTodoState;
  description: string;
  created_by: string;
  assigned_to: string;
  created_at: string;
  updated_at: string;
};

export type TTodoListState = {
  todoList: TTodo[];
  getTodoList: () => TTodo[];
  getTodoById: (id: string) => TTodo | undefined;
  getFilteredTodoList: (todoListParams: TTodoListParams) => TTodo[];
  createTodo: (todoData: TTodoFormData) => void;
  updateTodo: (todoData: TTodoFormData, id: string) => void;
  deleteTodo: (id: string) => void;
};
