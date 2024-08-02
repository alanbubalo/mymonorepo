import { Link } from "react-router-dom";
import { MdEdit } from "react-icons/md";
import dayjs from "dayjs";
import localizedFormat from "dayjs/plugin/localizedFormat";
import type { TTodo } from "../schemas/TodoSchema";
import { TodoStatus } from "../enums/TodoStatus";

interface ITodoCardProps {
  todo: TTodo;
}

export const TodoCard = ({ todo }: ITodoCardProps) => {
  dayjs.extend(localizedFormat);

  const statusClasses = {
    [TodoStatus.PENDING]: "bg-zinc-400 text-zinc-950",
    [TodoStatus.IN_PROGRESS]: "bg-blue-400 text-blue-950",
    [TodoStatus.DONE]: "bg-green-400 text-green-950",
  };

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
            {dayjs(todo.updated_at).diff(dayjs(todo.created_at)) !== 0 ? (
              <span>Updated at {dayjs(todo.updated_at).format("llll")}</span>
            ) : (
              dayjs(todo.created_at).format("llll")
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
      <Link className="hover:text-zinc-300 size-fit flex items-center gap-1" to={`/todo/edit/${todo.id}`}>
        <MdEdit /> Edit
      </Link>
    </div>
  );
};
