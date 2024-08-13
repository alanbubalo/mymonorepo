import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Select, TextInput } from "@shared/ui";
import { type SubmitHandler, useForm } from "react-hook-form";
import { FaTrashAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { statusOptions } from "../data/statusOptions";
import { type TTodoFormData, TodoFormSchema } from "../schemas/TodoFormSchema";
import type { TTodo } from "../schemas/TodoSchema";

interface ITodoFormProps {
  initData?: TTodo;
  isSubmitting: boolean;
  onSubmit: (data: TTodoFormData) => void;
  onDelete?: (id: string) => void;
}

export const TodoForm = ({ initData, isSubmitting, onSubmit, onDelete }: ITodoFormProps) => {
  const navigate = useNavigate();

  const isEdit = !!onDelete;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TTodoFormData>({
    resolver: zodResolver(TodoFormSchema),
  });

  const onFormSubmit: SubmitHandler<TTodoFormData> = async (data) => {
    await onSubmit(data);
    navigate("/");
  };

  const handleDelete = async () => {
    if (isEdit) {
      await onDelete(initData?.id ?? "");
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
          errorMessage={errors.description?.message}
          onChange={description.onChange}
          onBlur={description.onBlur}
        />
        <Select
          ref={status.ref}
          label="Status"
          name={status.name}
          defaultValue={initData?.status ?? "pending"}
          disabled={!isEdit}
          errorMessage={errors.status?.message}
          onChange={status.onChange}
          onBlur={status.onBlur}
          optionsList={statusOptions}
        />
        <TextInput
          ref={createdBy.ref}
          label="Created by"
          name={createdBy.name}
          required
          defaultValue={initData?.created_by ?? ""}
          errorMessage={errors.created_by?.message}
          onChange={createdBy.onChange}
          onBlur={createdBy.onBlur}
        />
        <TextInput
          ref={assignedTo.ref}
          label="Assigned to"
          name={assignedTo.name}
          required
          defaultValue={initData?.assigned_to ?? ""}
          errorMessage={errors.assigned_to?.message}
          onChange={assignedTo.onChange}
          onBlur={assignedTo.onBlur}
        />
      </div>
      <div className="flex gap-3">
        <Button type="submit" isLoading={isSubmitting}>
          {isEdit ? "Update" : "Add"}
        </Button>
        {isEdit && (
          <Button
            className="w-fit flex items-center gap-1"
            variant="danger"
            onClick={handleDelete}
            disabled={initData?.status !== "done"}
          >
            <FaTrashAlt className="size-4" /> Delete
          </Button>
        )}
      </div>
    </form>
  );
};
