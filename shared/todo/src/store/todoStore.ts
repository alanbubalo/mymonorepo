import dayjs from "dayjs";
import { create } from "zustand";
import { ulid } from "ulidx";
import type { Todo, TodoListState } from "../types/todo";

export const useTodoStore = create<TodoListState>()((set, get) => ({
  todoList: [] as Todo[],
  getTodoList: () => {
    return JSON.parse(localStorage.getItem("todoList") ?? "[]") as Todo[];
  },
  getTodoById: (id) => {
    return get()
      .getTodoList()
      .find((item) => item.id === id);
  },
  getFilteredTodoList: (search, state) => {
    return get()
      .getTodoList()
      .filter((todo) => {
        const lowerCaseSearch = search.toLowerCase();

        const isStateAll = state === "all";
        const searchMatchesDescription = todo.description
          .toLowerCase()
          .includes(lowerCaseSearch);
        const searchMatchesCreatedBy = todo.created_by
          .toLowerCase()
          .includes(lowerCaseSearch);
        const searchMatchesAssignedTo = todo.assigned_to
          .toLowerCase()
          .includes(lowerCaseSearch);

        const isSearchMatchingAny =
          searchMatchesDescription ||
          searchMatchesCreatedBy ||
          searchMatchesAssignedTo;

        return (isStateAll || todo.state === state) && isSearchMatchingAny;
      });
  },
  createTodo: (todo) => {
    const newTodo: Todo = {
      id: ulid(),
      created_at: dayjs(),
      updated_at: dayjs(),
      ...todo,
    };

    set((state) => {
      const updatedTodoList = [...state.getTodoList(), newTodo];
      localStorage.setItem("todoList", JSON.stringify(updatedTodoList));

      return { todoList: updatedTodoList };
    });
  },
  updateTodo: (updatedTodo, id) => {
    set((state) => {
      const updatedTodoList = state
        .getTodoList()
        .map((todo) =>
          todo.id === id
            ? { ...todo, ...updatedTodo, updated_at: dayjs() }
            : todo,
        );
      localStorage.setItem("todoList", JSON.stringify(updatedTodoList));

      return { todoList: updatedTodoList };
    });
  },
  deleteTodo: (id) => {
    set((state) => {
      const updatedTodoList = state
        .getTodoList()
        .filter((todo) => todo.id !== id);
      localStorage.setItem("todoList", JSON.stringify(updatedTodoList));

      return { todoList: updatedTodoList };
    });
  },
}));
