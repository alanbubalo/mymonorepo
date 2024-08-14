import { RiEmotionSadLine } from "react-icons/ri";

export const ServerError = () => {
  return (
    <div className="flex flex-col justify-center items-center max-w-80 mx-auto mt-10 w-full">
      <RiEmotionSadLine className="size-24 mb-6" />
      <h2 className="text-lg text-center">Server error</h2>
      <p className="text-zinc-400 text-center mt-1">Sorry, seems like something went wrong.</p>
    </div>
  );
};
