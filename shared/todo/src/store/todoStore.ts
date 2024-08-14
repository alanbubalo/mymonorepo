import { storage } from "@shared/storage";
import dayjs from "dayjs";
import { ulid } from "ulidx";
import { create, type StateCreator } from "zustand";
import type { TTodoFormData } from "../schemas/TodoFormSchema";
import type { TTodoListParams } from "../schemas/TodoListParamsSchema";
import { type TTodo, TodoSchema } from "../schemas/TodoSchema";

// type TodoState = {
//   todoId: string | undefined;
//   setTodoId: (todoId: string | undefined) => void;
//   todoList: TTodo[];
//   getTodoList: (params?: TTodoListParams) => TTodo[];
//   getTodoById: (id: string | undefined) => TTodo | undefined;
//   getFilteredTodoList: (todoListParams: TTodoListParams) => TTodo[];
//   createTodo: (todoData: TTodoFormData) => void;
//   updateTodo: (todoData: TTodoFormData) => void;
//   deleteTodo: () => void;
// };

type TTodoSlice = {
  todoId?: string;
  setTodoId: (todoId: string | undefined) => void;
  getTodoById: (id: string | undefined) => TTodo | undefined;
  create: (todoData: TTodoFormData) => void;
  update: (todoData: TTodoFormData) => void;
  delete: () => void;
};

type TTodoListSlice = {
  todoList: TTodo[];
  getTodoList: (params?: TTodoListParams) => TTodo[];
  getFilteredTodoList: (todoListParams: TTodoListParams) => TTodo[];
};

export const useTodoSlice: StateCreator<TTodoSlice & TTodoListSlice, [], [], TTodoSlice> = (set, _get) => ({
  todoId: undefined,
  setTodoId: (todoId) => set({ todoId }),
  getTodoById: (id) => {
    const todoList = storage.getItem<TTodo[]>("todoList") ?? ([] as TTodo[]);
    const parsedTodoList = todoList?.map((todo) => TodoSchema.parse(todo));

    return parsedTodoList?.find((item) => item.id === id);
  },
  create: (todoData) =>
    set(() => {
      const todoList = storage.getItem<TTodo[]>("todoList") ?? ([] as TTodo[]);
      const parsedTodoList = todoList?.map((todo) => TodoSchema.parse(todo));

      const newTodo: TTodo = {
        id: ulid(),
        created_at: dayjs().format(),
        updated_at: dayjs().format(),
        ...todoData,
      };

      const updatedTodoList = [...parsedTodoList, newTodo];
      storage.setItem("todoList", updatedTodoList);

      return { todoId: newTodo.id };
    }),
  update: (todoData) =>
    set((state) => {
      const todoList = storage.getItem<TTodo[]>("todoList") ?? ([] as TTodo[]);
      const parsedTodoList = todoList?.map((todo) => TodoSchema.parse(todo));

      const updatedTodoList = parsedTodoList.map((todo) => {
        const updatedTodo: TTodo = { ...todo, ...todoData, updated_at: dayjs().format() };

        return todo.id === state.todoId ? updatedTodo : todo;
      });
      storage.setItem("todoList", updatedTodoList);

      return { todoId: state.todoId };
    }),
  delete: () =>
    set((state) => {
      const todoList = storage.getItem<TTodo[]>("todoList") ?? ([] as TTodo[]);
      const parsedTodoList = todoList?.map((todo) => TodoSchema.parse(todo));

      const updatedTodoList = parsedTodoList.filter((todo) => todo.id !== state.todoId);
      storage.setItem("todoList", updatedTodoList);

      return { todoId: undefined };
    }),
});

export const useTodoListSlice: StateCreator<TTodoListSlice & TTodoSlice, [], [], TTodoListSlice> = (_set, get) => ({
  todoList: [] as TTodo[],
  getTodoList: (params) => {
    try {
      const todoList = storage.getItem<TTodo[]>("todoList");
      const parsedTodoList = todoList?.map((todo) => TodoSchema.parse(todo));

      if (params) {
        return get().getFilteredTodoList(params);
      }

      return parsedTodoList ?? ([] as TTodo[]);
    } catch (_error) {
      return [] as TTodo[];
    }
  },
  getFilteredTodoList: ({ search, status }) =>
    get().todoList.filter((todo) => {
      const lowerCaseSearch = search.toLowerCase();

      const isStatusAll = status === "all";
      const searchMatchesDescription = todo.description.toLowerCase().includes(lowerCaseSearch);
      const searchMatchesCreatedBy = todo.created_by.toLowerCase().includes(lowerCaseSearch);
      const searchMatchesAssignedTo = todo.assigned_to.toLowerCase().includes(lowerCaseSearch);

      const isSearchMatchingAny = searchMatchesDescription || searchMatchesCreatedBy || searchMatchesAssignedTo;

      return (isStatusAll || todo.status === status) && isSearchMatchingAny;
    }),
});

// export const useTodoStore = create<TodoState>()((set, get) => ({
//   todoId: undefined,
//   setTodoId: (todoId) => set({ todoId }),
//   todoList: [] as TTodo[],
//   getTodoList: (params) => {
//     try {
//       const todoList = storage.getItem<TTodo[]>("todoList");
//       const parsedTodoList = todoList?.map((todo) => TodoSchema.parse(todo));

//       if (params) {
//         return get().getFilteredTodoList(params);
//       }

//       return parsedTodoList ?? ([] as TTodo[]);
//     } catch (_error) {
//       return [] as TTodo[];
//     }
//   },
//   getTodoById: (id) => get().todoList.find((item) => item.id === id),
//   getFilteredTodoList: ({ search, status }) =>
//     get().todoList.filter((todo) => {
//       const lowerCaseSearch = search.toLowerCase();

//       const isStatusAll = status === "all";
//       const searchMatchesDescription = todo.description.toLowerCase().includes(lowerCaseSearch);
//       const searchMatchesCreatedBy = todo.created_by.toLowerCase().includes(lowerCaseSearch);
//       const searchMatchesAssignedTo = todo.assigned_to.toLowerCase().includes(lowerCaseSearch);

//       const isSearchMatchingAny = searchMatchesDescription || searchMatchesCreatedBy || searchMatchesAssignedTo;

//       return (isStatusAll || todo.status === status) && isSearchMatchingAny;
//     }),
//   createTodo: (todoData) =>
//     set((state) => {
//       const newTodo: TTodo = {
//         id: ulid(),
//         created_at: dayjs().format(),
//         updated_at: dayjs().format(),
//         ...todoData,
//       };

//       const updatedTodoList = [...state.todoList, newTodo];
//       storage.setItem("todoList", updatedTodoList);

//       return { todoList: updatedTodoList };
//     }),
//   updateTodo: (todoData) =>
//     set((state) => {
//       const updatedTodoList = state.todoList.map((todo) => {
//         const updatedTodo: TTodo = { ...todo, ...todoData, updated_at: dayjs().format() };

//         return todo.id === state.todoId ? updatedTodo : todo;
//       });
//       storage.setItem("todoList", updatedTodoList);

//       return { todoList: updatedTodoList };
//     }),
//   deleteTodo: () =>
//     set((state) => {
//       const updatedTodoList = state.getTodoList().filter((todo) => todo.id !== state.todoId);
//       storage.setItem("todoList", updatedTodoList);

//       return { todoList: updatedTodoList };
//     }),
// }));

export const useTodoStore = create<TTodoSlice & TTodoListSlice>()((...a) => ({
  ...useTodoSlice(...a),
  ...useTodoListSlice(...a),
}));
