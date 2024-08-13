import { Button } from "@shared/ui";
import { MdEdit } from "react-icons/md";
import { TodoStatus } from "../enums/TodoStatus";
import type { TTodo } from "../schemas/TodoSchema";
import { datetimeDiff } from "../utils/datetimeDiff";
import { formatDatetime } from "../utils/formatDatetime";

const statusClasses = {
  [TodoStatus.PENDING]: "bg-zinc-400 text-zinc-950",
  [TodoStatus.IN_PROGRESS]: "bg-blue-400 text-blue-950",
  [TodoStatus.DONE]: "bg-green-400 text-green-950",
};

interface ITodoCardProps {
  todo: TTodo;
}

export const TodoCard = ({ todo }: ITodoCardProps) => {
  return (
    <div className="w-full rounded-sm p-3 flex flex-row justify-between">
      <div className="flex flex-col gap-2">
        <div className="flex flex-col gap-1">
          <div className="flex flex-row gap-3 items-center">
            <p>{todo.description}</p>
            <span className={`${statusClasses[todo.status]} px-3 text-sm rounded-full size-fit`}>
              {todo.status.replace("_", " ")}
            </span>
          </div>
          <p className="text-zinc-400 text-sm">
            {datetimeDiff(todo.updated_at, todo.created_at) !== 0 ? (
              <span>Updated at {formatDatetime(todo.updated_at)}</span>
            ) : (
              formatDatetime(todo.created_at)
            )}
          </p>
        </div>
        <div className="flex flex-col gap-1">
          <p className="text-sm">
            <span className="text-zinc-400">Created by</span> {todo.created_by}
          </p>
          <p className="text-sm">
            <span className="text-zinc-400">Assigned to</span> {todo.assigned_to}
          </p>
        </div>
      </div>
      <Button className="size-fit flex items-center gap-1" to={`/todo/edit/${todo.id}`} transparent>
        <MdEdit /> Edit
      </Button>
    </div>
  );
};
