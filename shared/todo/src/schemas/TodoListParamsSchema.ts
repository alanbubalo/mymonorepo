import { z } from "zod";
import { TodoStatus } from "../enums/TodoStatus";

export const TodoListParamsSchema = z.object({
  search: z.string().max(256),
  status: z.nativeEnum({ ...TodoStatus, ALL: "all" as const }),
});

export type TTodoListParams = z.infer<typeof TodoListParamsSchema>;
