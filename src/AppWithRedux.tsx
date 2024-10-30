import React, { useCallback, useReducer, useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import { TasksPropsType, Todolist } from "./components/Todolist";
import { v1 } from "uuid";
import { title } from "process";
import { AddItemForm } from "./components/AddItemForm";
import {
  addTodolistAC,
  changeTodolistFilterAC,
  editTodolistTitleAC,
  removeTodolistAC,
  todolistsReducer,
} from "./state/todolists-reducer";
import {
  AddTaskAC,
  ChangeTaskStatusAC,
  EditTaskTitleAC,
  RemoveTaskAC,
  tasksReducer,
} from "./state/tasks-reducer";
import { useDispatch, useSelector } from "react-redux";
import { AppRootState } from "./app/store";

export type FilterValueType = "all" | "active" | "completed";

export type TodolistProps = {
  id: string;
  title: string;
  filter: FilterValueType;
};

export type TasksStateType = {
  [key: string]: TasksPropsType[];
};

function AppWithRedux() {
  console.log("App is called");

  let dispatch = useDispatch()

const todolists = useSelector<AppRootState, Array<TodolistProps>>(state => state.todolists)
const tasks = useSelector<AppRootState, TasksStateType>(state => state.tasks)


  let [filter, setFilter] = useState<FilterValueType>("all");

  const removeTask = (todolistId: string, taskId: string) => {
    let action = RemoveTaskAC(todolistId, taskId);
    dispatch(action);
  };

  const addTask = (todolistId: string, title: string) => {
    let action = AddTaskAC(todolistId, title);
    dispatch(action);
  };

  const changeTaskStatus = (
    todolistId: string,
    taskId: string,
    isDone: boolean
  ) => {
    let action = ChangeTaskStatusAC(todolistId, taskId, isDone);
    dispatch(action);
  };

  const editTaskTitle = (todolistId: string, taskId: string, title: string) => {
    let action = EditTaskTitleAC(todolistId, taskId, title);
    dispatch(action);
  };

  const changeTodolistFilter = (
    todolistId: string,
    filter: FilterValueType
  ) => {
    let action = changeTodolistFilterAC(todolistId, filter);
    dispatch(action);
  };

  const removeTodolist = (todolistId: string) => {
    let action = removeTodolistAC(todolistId)
    dispatch(action)
    // dispatch(action)
  };

  const addTodolist = (title: string) => {
    let action = addTodolistAC(title);
    dispatch(action);
    // dispatch(action)
  };

  const editTodolistTitle = (todolistId: string, title: string) => {
    let action = editTodolistTitleAC(todolistId, title);
    dispatch(action);
  };

  return (
    <div className="App">
      <AddItemForm callBack={(title: string) => addTodolist(title)} />

      {todolists.map((tl) => {
        let filteredTasks = tasks[tl.id];

        if (tl.filter === "active") {
          filteredTasks = filteredTasks.filter((t) => t.isDone === false);
        }

        if (tl.filter === "completed") {
          filteredTasks = filteredTasks.filter((t) => t.isDone === true);
        }

        return (
          <Todolist
            key={tl.id}
            id={tl.id}
            title={tl.title}
            filter={tl.filter}
            tasks={filteredTasks}
            removeTask={removeTask}
            addTask={addTask}
            editTaskTitle={editTaskTitle}
            changeTaskStatus={changeTaskStatus}
            changeTodolistFilter={changeTodolistFilter}
            removeTodolist={removeTodolist}
            editTodolistTitle={editTodolistTitle}
          />
        );
      })}
    </div>
  );
}

export default AppWithRedux;

//tdl-practice-git-10-master