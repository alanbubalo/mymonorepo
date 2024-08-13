import { storage } from "@shared/storage";
import { TodoSchema, type TTodo, type TTodoListParams, TodoListParamsSchema } from "@shared/todo";

export const fakeApiRequest = async <T>(callback: () => T): Promise<T> => {
  return new Promise((resolve, reject) => {
    const delay = Math.random() * (1000 - 250) + 250;

    if (Math.random() <= 0.1) {
      reject(new Error("10 percent chance of error"));
    }

    setTimeout(() => {
      resolve(callback());
    }, delay);
  });
};

export const getTodoList = async (params?: URLSearchParams) => {
  try {
    return await fakeApiRequest<TTodo[]>(() => {
      console.log("getTodoList");

      const freshtodoList = storage.getItem<TTodo[]>("todoList") ?? ([] as TTodo[]);

      const parsedTodoList = freshtodoList?.map((todo) => TodoSchema.parse(todo));

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
