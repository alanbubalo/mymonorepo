import { PageNotFound } from "@shared/layouts";
import { useTodoRouter } from "@shared/todo";
import { RouterProvider, createBrowserRouter } from "react-router-dom";

export const MainRouter = () => {
  const todoRoutes = useTodoRouter();

  return <RouterProvider router={createBrowserRouter([...todoRoutes, { path: "*", element: <PageNotFound /> }])} />;
};
