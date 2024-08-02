import { z } from "zod";
import { TodoStatus } from "../enums/TodoStatus";
import { isValid } from "ulidx";
import dayjs from "dayjs";

export const TodoSchema = z.object({
  id: z.string().refine((value) => isValid(value)),
  description: z.string().min(1).max(256),
  status: z.nativeEnum(TodoStatus),
  created_by: z.string().min(1).max(256),
  assigned_to: z.string().min(1).max(256),
  created_at: z.string().refine((value) => dayjs(value).isValid()),
  updated_at: z.string().refine((value) => dayjs(value).isValid()),
});

export type TTodo = z.infer<typeof TodoSchema>;
