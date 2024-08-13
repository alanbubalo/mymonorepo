import { storage } from "@shared/storage";
import dayjs from "dayjs";
import { ulid } from "ulidx";
import { fakeApiRequest } from "../api/fakeApiRequest";
import type { TTodoFormData } from "../schemas/TodoFormSchema";
import { type TTodoListParams, TodoListParamsSchema } from "../schemas/TodoListParamsSchema";
import { type TTodo, TodoSchema } from "../schemas/TodoSchema";

export const getTodoList = async (params?: URLSearchParams) => {
  try {
    return await fakeApiRequest<TTodo[]>(() => {
      const parsedTodoList = getParsedTodoList();

      if (params) {
        const validadedParams = TodoListParamsSchema.parse({
          search: params.get("search"),
          status: params.get("status"),
        });

        return getFilteredTodoList(parsedTodoList, validadedParams);
      }
      return parsedTodoList;
    });
  } catch (_error) {
    return undefined;
  }
};

const getParsedTodoList = () => {
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

export const getTodoById = async (id: string | undefined) => {
  try {
    return await fakeApiRequest<TTodo | undefined>(() => {
      const todoList = getParsedTodoList();
      return todoList.find((todo) => todo.id === id);
    });
  } catch (_error) {
    return undefined;
  }
};

export const createTodo = async (todoData: TTodoFormData) => {
  try {
    return await fakeApiRequest<TTodo>(() => {
      const newTodo: TTodo = {
        id: ulid(),
        created_at: dayjs().format(),
        updated_at: dayjs().format(),
        ...todoData,
      };

      const todoList = getParsedTodoList();
      const updatedTodoList = [...todoList, newTodo];
      storage.setItem("todoList", updatedTodoList);

      return newTodo;
    });
  } catch (_error) {
    return undefined;
  }
};

export const updateTodo = async (todoData: TTodoFormData, id: string) => {
  try {
    return await fakeApiRequest<TTodo | undefined>(() => {
      const todoList = getParsedTodoList();
      const updatedTodoList = todoList.map((todo) => {
        const updatedTodo: TTodo = { ...todo, ...todoData, updated_at: dayjs().format() };

        return todo.id === id ? updatedTodo : todo;
      });
      storage.setItem("todoList", updatedTodoList);

      return updatedTodoList.find((todo) => todo.id === id);
    });
  } catch (_error) {
    return undefined;
  }
};

export const deleteTodo = async (id: string) => {
  try {
    return await fakeApiRequest<boolean>(() => {
      const todoList = getParsedTodoList();
      const updatedTodoList = todoList.filter((todo) => todo.id !== id);

      if (updatedTodoList.length === todoList.length) {
        return false;
      }

      storage.setItem("todoList", updatedTodoList);

      return true;
    });
  } catch (_error) {
    return false;
  }
};
