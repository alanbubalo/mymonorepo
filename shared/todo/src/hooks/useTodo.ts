import { useQuery, useMutation, useQueryClient, skipToken } from "@tanstack/react-query";
import { getTodoById, createTodo, updateTodo, deleteTodo } from "../api/todoRequests";
import type { TTodoFormData } from "../schemas/TodoFormSchema";
import { QueryKeys } from "../enums/QueryKeys";

export const useTodo = (todoId?: string) => {
  const queryClient = useQueryClient();

  const fetching = useQuery({
    queryKey: [QueryKeys.TODO, todoId],
    queryFn: todoId ? async () => getTodoById(todoId) : skipToken,
  });

  const onSuccess = () => {
    queryClient.invalidateQueries({ queryKey: [QueryKeys.TODO_LIST] });
    queryClient.invalidateQueries({ queryKey: [QueryKeys.TODO] });
  };

  const creating = useMutation({
    mutationKey: [QueryKeys.TODO_CREATE],
    mutationFn: async (newTodoData: TTodoFormData) => createTodo(newTodoData),
    onSuccess,
  });

  const updating = useMutation({
    mutationKey: [QueryKeys.TODO_UPDATE, todoId],
    mutationFn: async (todoData: TTodoFormData) => {
      if (!todoId) {
        throw new Error("No todoId provided");
      }
      return await updateTodo(todoData, todoId);
    },
    onSuccess,
  });

  const deleting = useMutation({
    mutationKey: [QueryKeys.TODO_DELETE, todoId],
    mutationFn: async () => {
      if (!todoId) {
        throw new Error("No todoId provided");
      }
      return await deleteTodo(todoId);
    },
    onSuccess,
  });

  return {
    data: fetching.data,
    fetch: getTodoById(todoId),
    create: async (todoData: TTodoFormData) => creating.mutateAsync(todoData),
    update: async (todoData: TTodoFormData) => updating.mutateAsync(todoData),
    delete: async () => deleting.mutateAsync(),

    loading: {
      fetching: fetching.isPending,
      creating: creating.isPending,
      updating: updating.isPending,
    },
    error: fetching.error,
  };
};
