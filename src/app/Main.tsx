// @flow
import * as React from "react";
import {
  addTodolistTC,
  fetchTodolistsTC,
  TodolistDomainType,
} from "../state/todolists-reducer";
import { AppRootState, useAppDispatch } from "./store";
import { AddItemForm } from "../components/AddItemForm/AddItemForm";
import { useSelector } from "react-redux";
import { TasksStateType } from "../App";
import { useEffect } from "react";
import { TodolistList } from "../features/TodolistList/TodolistList";
import { Login } from "../features/Login/Login";
import { TodolistPage } from "./TodolistPage";
import { Outlet } from "react-router-dom";
type Props = {};

export const Main = (props: Props) => {
  return (
    <div className="App">
      <Outlet />
    </div>
  );
};
