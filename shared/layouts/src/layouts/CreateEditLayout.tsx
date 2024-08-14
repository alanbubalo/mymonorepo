import { Button } from "@shared/ui";
import { IoArrowBackOutline } from "react-icons/io5";

export const CreateEditLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex flex-col gap-4 justify-center size-full">
      <Button className="size-fit flex items-center gap-1" to="/" transparent icon={<IoArrowBackOutline />}>
        Back to home
      </Button>
      {children}
    </div>
  );
};
