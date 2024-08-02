import { TodoListParamsSchema } from "../schemas/TodoListParamsSchema";

export const getValidatedTodoListParams = (searchParams: URLSearchParams) => {
  try {
    return TodoListParamsSchema.parse({
      search: searchParams.get("search") || "",
      status: searchParams.get("status") || "all",
    });
  } catch (_error) {
    return {
      search: searchParams.get("search") || "",
      status: "all" as const,
    };
  }
};
