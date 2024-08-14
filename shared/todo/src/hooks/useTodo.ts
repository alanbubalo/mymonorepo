import { skipToken, useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createTodoAsync, deleteTodoAsync, getTodoByIdAsync, updateTodoAsync } from "../api/todoRequests";
import { QueryKeys } from "../enums/QueryKeys";
import type { TTodoFormData } from "../schemas/TodoFormSchema";

export const useTodo = (todoId?: string) => {
  const queryClient = useQueryClient();

  const fetching = useQuery({
    queryKey: [QueryKeys.TODO, todoId],
    queryFn: todoId ? async () => getTodoByIdAsync(todoId) : skipToken,
  });

  const onSuccess = () => {
    queryClient.invalidateQueries({ queryKey: [QueryKeys.TODO_LIST] });
    queryClient.invalidateQueries({ queryKey: [QueryKeys.TODO] });
  };

  const creating = useMutation({
    mutationKey: [QueryKeys.TODO_CREATE],
    mutationFn: async (newTodoData: TTodoFormData) => createTodoAsync(newTodoData),
    onSuccess,
    onError: (error) => console.error(error),
  });

  const updating = useMutation({
    mutationKey: [QueryKeys.TODO_UPDATE, todoId],
    mutationFn: async (todoData: TTodoFormData) => {
      if (!todoId) {
        throw new Error("No todoId provided");
      }
      return await updateTodoAsync(todoData, todoId);
    },
    onSuccess,
    onError: (error) => console.error(error),
  });

  const deleting = useMutation({
    mutationKey: [QueryKeys.TODO_DELETE, todoId],
    mutationFn: async () => {
      if (!todoId) {
        throw new Error("No todoId provided");
      }
      return await deleteTodoAsync(todoId);
    },
    onSuccess,
    onError: (error) => console.error(error),
  });

  return {
    data: fetching.data,
    fetch: getTodoByIdAsync(todoId),
    create: async (todoData: TTodoFormData) => creating.mutateAsync(todoData),
    update: async (todoData: TTodoFormData) => updating.mutateAsync(todoData),
    delete: async () => deleting.mutateAsync(),

    loading: {
      fetching: fetching.isLoading,
      creating: creating.isPending,
      updating: updating.isPending,
    },
    isError: fetching.isError,
  };
};
