import { IoIosCheckmark } from "react-icons/io";

export const EmptyTodoList = () => {
  return (
    <div className="flex flex-col justify-center items-center max-w-72 mx-auto mt-10">
      <IoIosCheckmark className="size-32" />
      <h2 className="text-lg text-center">No tasks found!?</h2>
      <p className="text-zinc-400 text-center mt-1">What a great day.</p>
    </div>
  );
};
