import { redirect } from "react-router-dom";
import { MainLayout } from "../screens/MainLayout";

export const useTodoRouter = () => {
  return [
    {
      path: "",
      element: <MainLayout />,
      children: [
        {
          path: "/",
          loader: async () => redirect("/todo/list"),
        },
        { path: "/todo", loader: async () => redirect("/todo/list") },
        {
          path: "/todo/list",
          async lazy() {
            const { TodoListScreen } = await import("../screens/list-screens/TodoListScreen");
            return { Component: TodoListScreen };
          },
        },
        {
          path: "/todo/create",
          async lazy() {
            const { CreateTodoScreen } = await import("../screens/create-edit-screens/CreateTodoScreen");
            return { Component: CreateTodoScreen };
          },
        },
        {
          path: "/todo/edit/:todoId",
          async lazy() {
            const { EditTodoScreen } = await import("../screens/create-edit-screens/EditTodoScreen");
            return { Component: EditTodoScreen };
          },
        },
      ],
    },
  ];
};
