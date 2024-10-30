import { createBrowserRouter, Navigate, useNavigate } from "react-router-dom";
import App from "../../App";
import { Login } from "../../features/Login/Login";
import { TodolistList } from "../../features/TodolistList/TodolistList";
import { TodolistPage } from "../../app/TodolistPage";
import { Page404 } from "../../components/Page404/Page404";

export const PATH = {
  LOGIN: "login",
  TODOLISTS: "todolists",
  PAGE404: "404",
} as const;


export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <Navigate to={PATH.PAGE404} />,
    children: [
      {
        path: PATH.LOGIN,
        element: <Login />,
      },
      {
        path: PATH.TODOLISTS,
        element: <TodolistPage />,
      },
      {
        path: "*",
        element: <Page404 />,
      },
    ],
  },
  { path: PATH.PAGE404, element: <Page404 /> },
]);
