import { z } from "zod";
import { TodoStatus } from "../enums/TodoStatus";

export const TodoFormSchema = z.object({
  description: z
    .string()
    .min(1, { message: "Description field is required" })
    .max(256, { message: "Must be 256 or fewer characters long" }),
  status: z.nativeEnum(TodoStatus, {
    message: "Must be either 'pending', 'in progress' or 'done'",
  }),
  created_by: z
    .string()
    .min(1, { message: "Created by field is required" })
    .max(256, { message: "Must be 256 or fewer characters long" }),
  assigned_to: z
    .string()
    .min(1, { message: "Assigned to field is required" })
    .max(256, { message: "Must be 256 or fewer characters long" }),
});

export type TTodoFormData = z.infer<typeof TodoFormSchema>;
