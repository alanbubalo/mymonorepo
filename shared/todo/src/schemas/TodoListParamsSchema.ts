import { z } from "zod";
import { TodoState } from "../enums/TodoState";

export const TodoListParamsSchema = z.object({
  search: z.string().max(256),
  state: z.nativeEnum({ ...TodoState, ALL: "all" as const }),
});

export type TodoListParamsSchemaType = z.infer<typeof TodoListParamsSchema>;
