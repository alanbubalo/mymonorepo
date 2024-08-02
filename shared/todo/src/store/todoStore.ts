import dayjs from "dayjs";
import { create } from "zustand";
import { ulid } from "ulidx";
import type { TTodo, TTodoListState } from "../types/todo";
import { storage } from "@shared/storage";
import { TodoSchema } from "../schemas/TodoSchema";

export const useTodoStore = create<TTodoListState>()((set, get) => ({
  todoList: [] as TTodo[],
  getTodoList: () => {
    const todoList = storage.getItem<TTodo[]>("todoList");

    try {
      const parsedTodoList = todoList?.map((todo) => TodoSchema.parse(todo));

      return parsedTodoList || ([] as TTodo[]);
    } catch (_error) {
      return [] as TTodo[];
    }
  },
  getTodoById: (id) => {
    return get()
      .getTodoList()
      .find((item) => item.id === id);
  },
  getFilteredTodoList: ({ search, state }) => {
    return get()
      .getTodoList()
      .filter((todo) => {
        const lowerCaseSearch = search.toLowerCase();

        const isStateAll = state === "all";
        const searchMatchesDescription = todo.description.toLowerCase().includes(lowerCaseSearch);
        const searchMatchesCreatedBy = todo.created_by.toLowerCase().includes(lowerCaseSearch);
        const searchMatchesAssignedTo = todo.assigned_to.toLowerCase().includes(lowerCaseSearch);

        const isSearchMatchingAny = searchMatchesDescription || searchMatchesCreatedBy || searchMatchesAssignedTo;

        return (isStateAll || todo.state === state) && isSearchMatchingAny;
      });
  },
  createTodo: (todoData) => {
    const newTodo: TTodo = {
      id: ulid(),
      created_at: dayjs().format(),
      updated_at: dayjs().format(),
      ...todoData,
    };

    set((state) => {
      const updatedTodoList = [...state.getTodoList(), newTodo];
      storage.setItem("todoList", updatedTodoList);

      return { todoList: updatedTodoList };
    });
  },
  updateTodo: (todoData, id) => {
    set((state) => {
      const updatedTodoList = state.getTodoList().map((todo) => {
        const updatedTodo: TTodo = { ...todo, ...todoData, updated_at: dayjs().format() };

        return todo.id === id ? updatedTodo : todo;
      });
      storage.setItem("todoList", updatedTodoList);

      return { todoList: updatedTodoList };
    });
  },
  deleteTodo: (id) => {
    set((state) => {
      const updatedTodoList = state.getTodoList().filter((todo) => todo.id !== id);
      storage.setItem("todoList", updatedTodoList);

      return { todoList: updatedTodoList };
    });
  },
}));
