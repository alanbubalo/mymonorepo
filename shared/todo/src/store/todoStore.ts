import { create } from "zustand";
import type { TTodoFormData } from "../schemas/TodoFormSchema";
import type { TTodoListParams } from "../schemas/TodoListParamsSchema";
import type { TTodo } from "../schemas/TodoSchema";
import { createTodo, deleteTodo, getTodoById, getTodoList, updateTodo } from "../utils/todoUtils";

type TodoState = {
  todoId: string | undefined;
  setTodoId: (todoId?: string) => void;
  todoList: TTodo[];
  getTodoList: (params?: TTodoListParams) => TTodo[];
  getTodoById: (id?: string) => TTodo | undefined;
  createTodo: (todoData: TTodoFormData) => void;
  updateTodo: (todoData: TTodoFormData) => void;
  deleteTodo: () => void;
};

export const useTodoStore = create<TodoState>()((set, get) => ({
  todoId: undefined,
  setTodoId: (todoId) => set({ todoId }),
  todoList: [] as TTodo[],
  getTodoList,
  getTodoById,
  createTodo,
  updateTodo: (todoData) => {
    return updateTodo(todoData, get().todoId);
  },
  deleteTodo: () => {
    return deleteTodo(get().todoId);
  },
}));
