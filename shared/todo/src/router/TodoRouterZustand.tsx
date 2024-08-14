import { redirect } from "react-router-dom";
import { MainLayout } from "../screens/MainLayout";

export const useTodoZustandRouter = () => {
  return [
    {
      path: "",
      element: <MainLayout title="Todo App using Zustand" />,
      children: [
        {
          path: "/",
          loader: async () => redirect("/todo/list"),
        },
        { path: "/todo", loader: async () => redirect("/todo/list") },
        {
          path: "/todo/list",
          async lazy() {
            const { TodoListScreen } = await import("../screens/list-screens/zustand/TodoListScreen");
            return { Component: TodoListScreen };
          },
        },
        {
          path: "/todo/create",
          async lazy() {
            const { CreateTodoScreen } = await import("../screens/create-edit-screens/zustand/CreateTodoScreen");
            return { Component: CreateTodoScreen };
          },
        },
        {
          path: "/todo/edit/:todoId",
          async lazy() {
            const { EditTodoScreen } = await import("../screens/create-edit-screens/zustand/EditTodoScreen");
            return { Component: EditTodoScreen };
          },
        },
      ],
    },
  ];
};
