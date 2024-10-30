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
type Props = {};

export const TodolistPage = (props: Props) => {
  console.log("App is called");

  let dispatch = useAppDispatch();

  const todolists = useSelector<AppRootState, Array<TodolistDomainType>>(
    (state) => state.todolists
  );
  const tasks = useSelector<AppRootState, TasksStateType>(
    (state) => state.tasks
  );

  useEffect(() => {
    const thunk = fetchTodolistsTC();
    dispatch(thunk);
  }, []);

  const addTodolist = React.useCallback((title: string) => {
    const thunk = addTodolistTC(title);
    dispatch(thunk);
  }, []);

  return (
    <div className="App">
      <AddItemForm callBack={addTodolist} />

      <>
        <TodolistList todolists={todolists} tasks={tasks} />

     </>
    </div>
  );
};
