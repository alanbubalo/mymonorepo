import { TodoStatus } from "../enums/TodoStatus";
import { TodoListParamsStatus } from "../schemas/TodoListParamsSchema";

export const statusOptions = [
  {
    value: TodoStatus.PENDING,
    label: "Pending",
  },
  {
    value: TodoStatus.IN_PROGRESS,
    label: "In progress",
  },
  {
    value: TodoStatus.DONE,
    label: "Done",
  },
];

export const statusFilterOptions = [
  {
    value: TodoListParamsStatus.ALL,
    label: "All",
  },
  {
    value: TodoListParamsStatus.PENDING,
    label: "Pending",
  },
  {
    value: TodoListParamsStatus.IN_PROGRESS,
    label: "In progress",
  },
  {
    value: TodoListParamsStatus.DONE,
    label: "Done",
  },
];
