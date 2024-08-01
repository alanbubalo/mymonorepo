import type { Dayjs } from "dayjs";
import type { TodoSchemaType } from "../schemas/TodoSchema";
import type { TTodoState } from "../enums/TodoState";

export interface Todo {
  id: string;
  state: TTodoState;
  description: string;
  created_by: string;
  assigned_to: string;
  created_at: Dayjs;
  updated_at: Dayjs;
}

export interface TodoListState {
  todoList: Todo[];
  getTodoList: () => Todo[];
  getTodoById: (id: string) => Todo | undefined;
  getFilteredTodoList: (
    searchTerm: string,
    filterState: TTodoState | "all",
  ) => Todo[];
  createTodo: (todo: TodoSchemaType) => void;
  updateTodo: (todo: TodoSchemaType, id: string) => void;
  deleteTodo: (id: string) => void;
}
