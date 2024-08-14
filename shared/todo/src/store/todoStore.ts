import { create } from "zustand";
import type { TTodoFormData } from "../schemas/TodoFormSchema";
import type { TTodoListParams } from "../schemas/TodoListParamsSchema";
import type { TTodo } from "../schemas/TodoSchema";
import { createTodo, deleteTodo, getTodoById, getTodoList, updateTodo } from "../utils/todoUtils";

type TodoState = {
  todoId: string | undefined;
  setTodoId: (todoId?: string) => void;
  getTodoList: (params?: TTodoListParams) => TTodo[];
  getTodoById: (id: string) => TTodo | undefined;
  createTodo: (todoData: TTodoFormData) => void;
  updateTodo: (todoData: TTodoFormData) => void;
  deleteTodo: () => void;
};

export const useTodoStore = create<TodoState>()((set, get) => ({
  todoId: undefined,
  setTodoId: (todoId) => set({ todoId }),
  getTodoList,
  getTodoById,
  createTodo,
  updateTodo: (todoData) => {
    const todoId = get().todoId;
    if (!todoId) {
      console.error("No todoId provided");
      return;
    }
    updateTodo(todoData, todoId);
  },
  deleteTodo: () => {
    const todoId = get().todoId;
    if (!todoId) {
      console.error("No todoId provided");
      return;
    }
    deleteTodo(todoId);
  },
}));
