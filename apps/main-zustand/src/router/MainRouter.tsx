import { PageNotFound } from "@shared/layouts";
import { useTodoZustandRouter } from "@shared/todo";
import { RouterProvider, createBrowserRouter } from "react-router-dom";

export const MainRouter = () => {
  const todoRoutes = useTodoZustandRouter();

  return <RouterProvider router={createBrowserRouter([...todoRoutes, { path: "*", element: <PageNotFound /> }])} />;
};
