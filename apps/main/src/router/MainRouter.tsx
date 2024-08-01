import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { useTodoRouter } from "@shared/todo";
import { PageNotFound } from "../screens/PageNotFound";

export const MainRouter = () => {
  const todoRoutes = useTodoRouter();

  return <RouterProvider router={createBrowserRouter([...todoRoutes, { path: "*", element: <PageNotFound /> }])} />;
};
