import { Outlet } from "react-router-dom";

export function MainLayout() {
  return (
    <div className="bg-zinc-800 text-zinc-50 min-h-screen flex flex-col">
      <div className="container max-w-4xl mx-auto p-4 flex flex-col gap-6 flex-1">
        <h1 className="text-2xl">Small Todo App</h1>
        <div className="flex flex-1 w-full mx-auto">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
