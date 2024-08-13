import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { useTodoRouter } from "@shared/todo";
import { PageNotFound } from "@shared/layouts";

export const MainRouter = () => {
  const todoRoutes = useTodoRouter();

  return <RouterProvider router={createBrowserRouter([...todoRoutes, { path: "*", element: <PageNotFound /> }])} />;
};
