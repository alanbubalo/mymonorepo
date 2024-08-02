import type { TodoSchemaType } from "../schemas/TodoSchema";
import type { TTodoState } from "../enums/TodoState";

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
  getFilteredTodoList: (searchTerm: string, filterState: TTodoState | "all") => TTodo[];
  createTodo: (todoData: TodoSchemaType) => void;
  updateTodo: (todoData: TodoSchemaType, id: string) => void;
  deleteTodo: (id: string) => void;
};
