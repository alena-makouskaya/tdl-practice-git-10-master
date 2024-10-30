import React, { useEffect } from "react";

import "./App.css";
import { AddItemForm } from "./components/AddItemForm/AddItemForm";
import {
  addTodolistTC,
  fetchTodolistsTC,
  TodolistDomainType,
} from "./state/todolists-reducer";
import { useSelector } from "react-redux";
import { AppRootState, useAppDispatch } from "./app/store";
import { TaskType } from "./api/todolists-api";
import { TodolistList } from "./features/TodolistList/TodolistList";

export type TasksStateType = {
  [key: string]: TaskType[];
};

const AppWithRedux = React.memo(() => {
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
});

export default AppWithRedux;
