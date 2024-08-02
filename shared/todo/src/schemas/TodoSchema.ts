import { z } from "zod";
import { TodoState } from "../enums/TodoState";
import { isValid } from "ulidx";
import dayjs from "dayjs";

export const TodoSchema = z.object({
  id: z.string().refine((value) => isValid(value)),
  description: z.string().min(1).max(256),
  state: z.nativeEnum(TodoState),
  created_by: z.string().min(1).max(256),
  assigned_to: z.string().min(1).max(256),
  created_at: z.string().refine((value) => dayjs(value).isValid()),
  updated_at: z.string().refine((value) => dayjs(value).isValid()),
});

export type TodoSchemaType = z.infer<typeof TodoSchema>;
