import {
  AddTodolistActionType,
  RemoveTodolistActionType,
  SetTodolistsActionType,
} from "./todolists-reducer";

import { TasksStateType } from "../App";

import {
  TaskType,
  todolistAPI,
  UpdateTaskModelType,
} from "../api/todolists-api";
import { Dispatch } from "redux";
import { AppRootState } from "../app/store";


let initialState: TasksStateType = {};

export const tasksReducer = (
  state: TasksStateType = initialState,
  action: ActionType
): TasksStateType => {
  switch (action.type) {
    case "REMOVE-TASK": {
      return {
        ...state,
        [action.todolistId]: state[action.todolistId].filter(
          (task) => task.id !== action.taskId
        ),
      };
    }

    case "ADD-TASK": {
      return {
        ...state,
        [action.task.todoListId]: [
          // {
          //   id: v1(),
          //   todoListId: action.task.todoListId,
          //   title: action.task.title,
          //   description: "",
          //   status: TaskStatuses.New,
          //   priority: TaskPriorities.Low,
          //   startDate: "",
          //   deadline: "",
          //   addedDate: "",
          //   order: 0,
          // },
          action.task,
          ...state[action.task.todoListId],
        ],
      };
    }

    case "UPDATE-TASK": {
      return {
        ...state,
        [action.todolistId]: state[action.todolistId].map((task) =>
          task.id === action.taskId ? { ...task, ...action.model } : task
        ),
      };
    }

    case "ADD-TODOLIST": {
      return {...state, [action.todolist.id]: []}
    }

    case "REMOVE-TODOLIST": {
      const stateCopy = { ...state };
      delete stateCopy[action.todolistId];
      return stateCopy;
    }

    case "SET-TODOLISTS": {
      const stateCopy = { ...state };
      action.todolists.forEach((tl) => {
        stateCopy[tl.id] = [];
      });
      return stateCopy;
    }

    case "SET-TASKS": {
      return {...state, [action.todolistId]: action.tasks}
    }

    default:
      return state;
  }
};

// actions

export const removeTaskAC = (todolistId: string, taskId: string) =>
  ({ type: "REMOVE-TASK", todolistId, taskId } as const);

export const addTaskAC = (task: TaskType) =>
  ({ type: "ADD-TASK", task } as const);

export const updateTaskAC = (
  todolistId: string,
  taskId: string,
  model: UpdateDomainTaskModelType
) =>
  ({
    type: "UPDATE-TASK",
    todolistId,
    taskId,
    model,
  } as const);

export const setTasksAC = (todolistId: string, tasks: Array<TaskType>) =>
  ({
    type: "SET-TASKS",
    todolistId,
    tasks,
  } as const);

// thunks

export const fetchTasksTC = (todolistId: string) => (dispatch: Dispatch<ActionType>) => {
  todolistAPI.getTasks(todolistId).then((res) => {
    let action = setTasksAC(todolistId, res.data.items);
    dispatch(action);
  });
};

export const removeTasksTC =
  (todolistId: string, taskId: string) => (dispatch: Dispatch<ActionType>) => {
    todolistAPI.deleteTask(todolistId, taskId).then((res) => {
      let action = removeTaskAC(todolistId, taskId);
      dispatch(action);
    });
  };

export const addTasksTC =
  (todolistId: string, title: string) => (dispatch: Dispatch<ActionType>) => {
    todolistAPI.createTask(todolistId, title).then((res) => {
      const task = res.data.data.item;
      let action = addTaskAC(task);
      dispatch(action);
    });
  };

export const updateTaskTC =
  (
    todolistId: string,
    taskId: string,
    domainModel: UpdateDomainTaskModelType
  ) =>
  (dispatch: Dispatch<ActionType>, getState: () => AppRootState) => {
    const state = getState();
    const task = state.tasks[todolistId].find((task) => task.id === taskId);
    if (!task) {
      throw new Error("task not found in the state");
      return;
    }

    const apiModel: UpdateTaskModelType = {
      title: task?.title,
      description: task?.description,
      priority: task?.priority,
      startDate: task?.startDate,
      deadline: task?.deadline,
      status: task.status,
      ...domainModel,
    };

    todolistAPI.updateTask(todolistId, taskId, apiModel).then((res) => {
      let action = updateTaskAC(todolistId, taskId, domainModel);
      dispatch(action);
    });
  };

export type UpdateDomainTaskModelType = {
  title?: string;
  description?: string;
  status?: number;
  priority?: number;
  startDate?: string;
  deadline?: string;
};

// types
export type UpdateTaskActionType = ReturnType<typeof updateTaskAC>;
export type AddTaskActionType = ReturnType<typeof addTaskAC>;
export type RemoveTaskActionType = ReturnType<typeof removeTaskAC>;
export type SetTasksActionType = ReturnType<typeof setTasksAC>;


type ActionType =
  | RemoveTaskActionType
  | AddTaskActionType
  | UpdateTaskActionType
  | AddTodolistActionType
  | RemoveTodolistActionType
  | SetTodolistsActionType
  | SetTasksActionType;