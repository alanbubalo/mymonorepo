import { TodoListParamsSchema } from "../schemas/TodoListParamsSchema";

export const getValidatedTodoListParams = (searchParams: URLSearchParams) => {
  try {
    return TodoListParamsSchema.parse({
      search: searchParams.get("search") || "",
      state: searchParams.get("state") || "all",
    });
  } catch (_) {
    return {
      search: searchParams.get("search") || "",
      state: "all" as const,
    };
  }
};
