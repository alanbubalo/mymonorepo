import { useNavigate } from "react-router-dom";
import { type SubmitHandler, useForm } from "react-hook-form";
import { FaTrashAlt } from "react-icons/fa";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Select, TextInput } from "@shared/ui";
import type { TTodo } from "../schemas/TodoSchema";
import { TodoFormSchema, type TTodoFormData } from "../schemas/TodoFormSchema";

interface ITodoFormProps {
  initData?: TTodo;
  onSubmit: (data: TTodoFormData) => void;
  onDelete?: (id: string) => void;
}

export const TodoForm = ({ initData, onSubmit, onDelete }: ITodoFormProps) => {
  const navigate = useNavigate();

  const isEdit = !!onDelete;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TTodoFormData>({
    resolver: zodResolver(TodoFormSchema),
  });

  const onFormSubmit: SubmitHandler<TTodoFormData> = (data) => {
    onSubmit(data);
    navigate("/");
  };

  const handleDelete = () => {
    if (isEdit) {
      onDelete(initData?.id ?? "");
      navigate("/");
    }
  };

  const description = register("description");
  const status = register("status");
  const createdBy = register("created_by");
  const assignedTo = register("assigned_to");

  return (
    <form onSubmit={handleSubmit(onFormSubmit)} className="flex flex-col h-full gap-5">
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        <TextInput
          ref={description.ref}
          required
          label="Description"
          name={description.name}
          defaultValue={initData?.description ?? ""}
          errors={errors.description}
          onChange={description.onChange}
          onBlur={description.onBlur}
        />
        <Select
          ref={status.ref}
          label="Status"
          name={status.name}
          defaultValue={initData?.status ?? "pending"}
          disabled={!isEdit}
          errors={errors.status}
          onChange={status.onChange}
          onBlur={status.onBlur}
        >
          <option value="pending">Pending</option>
          <option value="in_progress">In progress</option>
          <option value="done">Done</option>
        </Select>
        <TextInput
          ref={createdBy.ref}
          label="Created by"
          name={createdBy.name}
          required
          defaultValue={initData?.created_by ?? ""}
          errors={errors.created_by}
          onChange={createdBy.onChange}
          onBlur={createdBy.onBlur}
        />
        <TextInput
          ref={assignedTo.ref}
          label="Assigned to"
          name={assignedTo.name}
          required
          defaultValue={initData?.assigned_to ?? ""}
          errors={errors.assigned_to}
          onChange={assignedTo.onChange}
          onBlur={assignedTo.onBlur}
        />
      </div>
      <div className="flex gap-3">
        <Button type="submit">{isEdit ? "Update" : "Add"}</Button>
        {isEdit && (
          <Button
            className="bg-red-500 hover:bg-red-600 w-fit disabled:hover:bg-red-400/75 disabled:bg-red-400/75 flex items-center gap-1"
            onClick={handleDelete}
            disabled={initData?.status !== "done"}
          >
            <FaTrashAlt /> Delete
          </Button>
        )}
      </div>
    </form>
  );
};
