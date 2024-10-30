import {
  addTodolistAC,
  AddTodolistActionType,
  RemoveTodolistActionType,
  SetTodolistsActionType,
} from "./todolists-reducer";
import { v1 } from "uuid";
import { TasksStateType } from "../AppWithRedux";
import { title } from "process";
import {
  TaskPriorities,
  TaskStatuses,
  TaskType,
  todolistAPI,
  UpdateTaskModelType,
} from "../api/todolists-api";
import { Dispatch } from "redux";
import { AppRootState } from "../app/store";

export type UpdateTaskActionType = {
  type: "UPDATE-TASK";
  todolistId: string;
  taskId: string;
  model: UpdateDomainTaskModelType;
};

export type AddTaskActionType = {
  type: "ADD-TASK";
  task: TaskType;
};

export type RemoveTaskActionType = {
  type: "REMOVE-TASK";
  todolistId: string;
  taskId: string;
};

export type SetTasksActionType = {
  type: "SET-TASKS";
  todolistId: string;
  tasks: Array<TaskType>;
};

type ActionType =
  | RemoveTaskActionType
  | AddTaskActionType
  | UpdateTaskActionType
  | AddTodolistActionType
  | RemoveTodolistActionType
  | SetTodolistsActionType
  | SetTasksActionType;

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
      let stateCopy = { ...state };

      stateCopy[action.todolist.id] = [];

      return stateCopy;
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
      const stateCopy = { ...state };
      stateCopy[action.todolistId] = action.tasks;
      return stateCopy;
    }

    default:
      return state;
  }
};

export const RemoveTaskAC = (
  todolistId: string,
  taskId: string
): RemoveTaskActionType => {
  return {
    type: "REMOVE-TASK",
    todolistId,
    taskId,
  };
};

export const AddTaskAC = (task: TaskType): AddTaskActionType => {
  return {
    type: "ADD-TASK",
    task,
  };
};


export const updateTaskAC = (
  todolistId: string,
  taskId: string,
  model: UpdateDomainTaskModelType
): UpdateTaskActionType => {
  return {
    type: "UPDATE-TASK",
    todolistId,
    taskId,
    model,
  };
};

export const SetTasksAC = (
  todolistId: string,
  tasks: Array<TaskType>
): SetTasksActionType => {
  return {
    type: "SET-TASKS",
    todolistId,
    tasks,
  };
};

export const fetchTasksTC = (todolistId: string) => {
  return (dispatch: Dispatch) => {
    todolistAPI.getTasks(todolistId).then((res) => {
      let action = SetTasksAC(todolistId, res.data.items);
      dispatch(action);
    });
  };
};

export const removeTasksTC = (todolistId: string, taskId: string) => {
  return (dispatch: Dispatch) => {
    todolistAPI.deleteTask(todolistId, taskId).then((res) => {
      let action = RemoveTaskAC(todolistId, taskId);
      dispatch(action);
    });
  };
};

export const addTasksTC = (todolistId: string, title: string) => {
  return (dispatch: Dispatch) => {
    todolistAPI.createTask(todolistId, title).then((res) => {
      const task = res.data.data.item;
      let action = AddTaskAC(task);
      dispatch(action);
    });
  };
};

export const updateTaskTC = (
  todolistId: string,
  taskId: string,
  domainModel: UpdateDomainTaskModelType
) => {
  return (dispatch: Dispatch, getState: () => AppRootState) => {

    const state  = getState()
    const task = state.tasks[todolistId].find((task) => task.id === taskId)
    if(!task) {
      throw new Error("task not found in the state")
      return
    }

    const apiModel: UpdateTaskModelType = {
      title: task?.title,
      description: task?.description,      
      priority: task?.priority,
      startDate: task?.startDate,
      deadline: task?.deadline,
      status: task.status,
      ...domainModel
    };

    todolistAPI.updateTask(todolistId, taskId, apiModel).then((res) => {
      let action = updateTaskAC(todolistId, taskId, domainModel);
      dispatch(action);
    });
  };
};


export type UpdateDomainTaskModelType = {
  title?: string
  description?: string
  status?: number
  priority?: number
  startDate?: string
  deadline?: string
}