import { fakeApiRequest } from "../api/fakeApiRequest";
import type { TTodoFormData } from "../schemas/TodoFormSchema";
import type { TTodoListParams } from "../schemas/TodoListParamsSchema";
import { createTodo, deleteTodo, getTodoById, getTodoList, updateTodo } from "../utils/todoUtils";

export const getTodoListAsync = async (params?: TTodoListParams) => {
  return await fakeApiRequest(() => getTodoList(params));
};

export const getTodoByIdAsync = async (id: string | undefined) => {
  return await fakeApiRequest(() => getTodoById(id));
};

export const createTodoAsync = async (todoData: TTodoFormData) => {
  return await fakeApiRequest(() => createTodo(todoData));
};

export const updateTodoAsync = async (todoData: TTodoFormData, id: string) => {
  return await fakeApiRequest(() => updateTodo(todoData, id));
};

export const deleteTodoAsync = async (id: string) => {
  return await fakeApiRequest<boolean>(() => deleteTodo(id));
};
