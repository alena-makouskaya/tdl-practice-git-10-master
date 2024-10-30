// @flow
import * as React from "react";
import {
  changeTodolistFilterAC,
  editTodolistTitleTC,
  FilterValueType,
  removeTodolistTC,
  TodolistDomainType,
} from "../../state/todolists-reducer";
import { TasksStateType } from "../../App";
import { useAppDispatch } from "../../app/store";
import {
  addTasksTC,
  removeTasksTC,
  updateTaskTC,
} from "../../state/tasks-reducer";
import { TaskStatuses } from "../../api/todolists-api";
import { Todolist } from "./Todolist/Todolist";

type Props = {
  todolists: TodolistDomainType[];
  tasks: TasksStateType;
};
export const TodolistList = (props: Props) => {
  const { todolists, tasks } = props;

  let dispatch = useAppDispatch();

  const editTodolistTitle = React.useCallback(
    (todolistId: string, title: string) => {
      const thunk = editTodolistTitleTC(todolistId, title);
      dispatch(thunk);
    },
    []
  );

  const removeTask = React.useCallback((todolistId: string, taskId: string) => {
    const thunk = removeTasksTC(todolistId, taskId);
    dispatch(thunk);
  }, []);

  const addTask = React.useCallback((todolistId: string, title: string) => {
    const thunk = addTasksTC(todolistId, title);
    dispatch(thunk);
  }, []);

  const changeTaskStatus = React.useCallback(
    (todolistId: string, taskId: string, status: TaskStatuses) => {
      const thunk = updateTaskTC(todolistId, taskId, { status });
      dispatch(thunk);
    },
    []
  );

  const editTaskTitle = React.useCallback(
    (todolistId: string, taskId: string, title: string) => {
      const thunk = updateTaskTC(todolistId, taskId, { title });
      dispatch(thunk);
    },
    []
  );

  const changeTodolistFilter = React.useCallback(
    (todolistId: string, filter: FilterValueType) => {
      let action = changeTodolistFilterAC(todolistId, filter);
      dispatch(action);
    },
    []
  );

  const removeTodolist = React.useCallback((todolistId: string) => {
    const thunk = removeTodolistTC(todolistId);
    dispatch(thunk);
  }, []);

  return (
    <div>
      {" "}
      {todolists.map((tl) => {
        let filteredTasks = tasks[tl.id];

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
};
