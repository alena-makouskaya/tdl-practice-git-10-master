// @flow
import * as React from "react";
import { KeyboardEvent } from "react";
import { FilterValueType } from "../App";
import { AddItemForm } from "./AddItemForm";
import { EditableSpan } from "./EditableSpan";
export type TasksPropsType = {
  id: string;
  title: string;
  isDone: boolean;
};

type TodolistPropsType = {
  id: string;
  title: string;
  filter: FilterValueType;
  tasks: TasksPropsType[];

  removeTask: (todolistId: string, taskId: string) => void;
  addTask: (todolistId: string, title: string) => void;
  changeTaskStatus: (
    todolistId: string,
    taskId: string,
    isDone: boolean
  ) => void;
  editTaskTitle: (todolistId: string, taskId: string, title: string) => void;

  changeTodolistFilter: (todolistId: string, filter: FilterValueType) => void;
  removeTodolist: (todolistId: string) => void;
  editTodolistTitle: (todolistId: string, title: string) => void
};

export const Todolist = (props: TodolistPropsType) => {
  console.log("Todolist is called");
  const {
    id,
    title,
    filter,
    tasks,
    removeTask,
    addTask,
    changeTodolistFilter,
    changeTaskStatus,
    removeTodolist,
    editTaskTitle,
    editTodolistTitle
  } = props;

  const removeTaskHandler = (taskId: string) => {
    removeTask(id, taskId);
  };

  const addTaskHandler = (title: string) => {
    addTask(id, title);
  };

  const changeTaskStatusHandler = (taskId: string, isDone: boolean) => {
    changeTaskStatus(id, taskId, isDone);
  };

  const editTaskTitleHandler = (taskId: string, title: string) => {
    editTaskTitle(id, taskId, title);
  };

  const changeTodolistFilterAll = () => {
    changeTodolistFilter(id, "all");
  };

  const changeTodolistFilterActive = () => {
    changeTodolistFilter(id, "active");
  };

  const changeTodolistFilterCompleted = () => {
    changeTodolistFilter(id, "completed");
  };

  const removeTodolistHandler = () => {
    removeTodolist(id);
  };

  const editTodolistTitleHandler = (title: string) => {
    editTodolistTitle(id, title)
  }

  return (
    <div className="tdlCard" key={id}>
      <h3>
        <EditableSpan title={title} callBack={editTodolistTitleHandler} />
         - <button onClick={removeTodolistHandler}> x </button>
      </h3>

      <AddItemForm callBack={addTaskHandler} />

      <ul>
        {tasks.map((t) => {
          return (
            <li key={t.id}>
              <input
                type="checkbox"
                checked={t.isDone}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  changeTaskStatusHandler(t.id, e.currentTarget.checked)
                }
              />
              {/* <span>{t.title}</span> */}
              <EditableSpan
                title={t.title}
                callBack={(title: string) => editTaskTitleHandler(t.id, title)}
              />
              <button onClick={() => removeTaskHandler(t.id)}> x </button>
            </li>
          );
        })}
      </ul>

      <div>
        <button
          className={filter === "all" ? "isActive" : ""}
          onClick={changeTodolistFilterAll}
        >
          All
        </button>
        <button
          className={filter === "active" ? "isActive" : ""}
          onClick={changeTodolistFilterActive}
        >
          Active
        </button>
        <button
          className={filter === "completed" ? "isActive" : ""}
          onClick={changeTodolistFilterCompleted}
        >
          Completed
        </button>
      </div>
    </div>
  );
};
