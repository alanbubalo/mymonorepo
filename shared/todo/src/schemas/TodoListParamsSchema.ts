import { z } from "zod";
import { TodoStatus } from "../enums/TodoStatus";

export const TodoListParamsStatus = { ...TodoStatus, ALL: "all" as const };

export const TodoListParamsSchema = z.object({
  search: z.string().max(256).catch(""),
  status: z.nativeEnum(TodoListParamsStatus).catch(TodoListParamsStatus.ALL),
});

export type TTodoListParams = z.infer<typeof TodoListParamsSchema>;
