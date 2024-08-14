import { storage } from "@shared/storage";
import dayjs from "dayjs";
import { ulid } from "ulidx";
import type { TTodoFormData } from "../schemas/TodoFormSchema";
import type { TTodoListParams } from "../schemas/TodoListParamsSchema";
import { type TTodo, TodoSchema } from "../schemas/TodoSchema";

export const getParsedTodoList = () => {
  try {
    const freshtodoList = storage.getItem<TTodo[]>("todoList") ?? ([] as TTodo[]);
    return freshtodoList?.map((todo) => TodoSchema.parse(todo));
  } catch (_error) {
    return [] as TTodo[];
  }
};

export const getFilteredTodoList = (todoList: TTodo[], params: TTodoListParams) => {
  return todoList.filter((todo) => {
    const lowerCaseSearch = params.search.toLowerCase();

    const isStatusAll = params.status === "all";
    const searchMatchesDescription = todo.description.toLowerCase().includes(lowerCaseSearch);
    const searchMatchesCreatedBy = todo.created_by.toLowerCase().includes(lowerCaseSearch);
    const searchMatchesAssignedTo = todo.assigned_to.toLowerCase().includes(lowerCaseSearch);

    const isSearchMatchingAny = searchMatchesDescription || searchMatchesCreatedBy || searchMatchesAssignedTo;

    return (isStatusAll || todo.status === params.status) && isSearchMatchingAny;
  });
};

export const getTodoList = (params?: TTodoListParams) => {
  const parsedTodoList = getParsedTodoList();

  if (params) {
    return getFilteredTodoList(parsedTodoList, params);
  }
  return parsedTodoList;
};

export const getTodoById = (id: string) => {
  return getTodoList().find((todo) => todo.id === id);
};

export const createTodo = (todoData: TTodoFormData) => {
  const newTodo: TTodo = {
    id: ulid(),
    created_at: dayjs().format(),
    updated_at: dayjs().format(),
    ...todoData,
  };

  const todoList = getTodoList();
  const updatedTodoList = [...todoList, newTodo];
  storage.setItem("todoList", updatedTodoList);
};

export const updateTodo = (todoData: TTodoFormData, id: string) => {
  const todoList = getTodoList();
  const updatedTodoList = todoList.map((todo) => {
    const updatedTodo: TTodo = { ...todo, ...todoData, updated_at: dayjs().format() };

    return id && todo.id === id ? updatedTodo : todo;
  });
  storage.setItem("todoList", updatedTodoList);
};

export const deleteTodo = (id: string) => {
  const todoList = getTodoList();

  const updatedTodoList = todoList.filter((todo) => todo.id !== id);

  if (updatedTodoList.length === todoList.length) {
    return false;
  }

  storage.setItem("todoList", updatedTodoList);
  return true;
};
