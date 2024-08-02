import { TodoState } from "../enums/TodoState";
import type { TTodo } from "../types/todo";

export const isTodoList = (x: any): x is TTodo[] => {
  return Object.values(TodoState).includes(x?.[0]?.state) || x?.length === 0;
};
