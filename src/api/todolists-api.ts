import { title } from 'process';
import axios from "axios";

const settings = {
  withCredentials: true,
  headers: {
    "API-KEY": "7b598717-c73b-45c6-bd2c-d5029693391a",
  },
};

const instance = axios.create({
  baseURL: "https://social-network.samuraijs.com/api/1.1/",
  ...settings,
});

export const todolistAPI = {
  getTodolists() {
    return instance.get<Array<TodolistType>>(`todo-lists`);
  },

  createTodolist(title: string) {
    return instance.post<ResponseType<{ item: TodolistType }>>(`todo-lists`, {
      title,
    });
  },

  deleteTodolist(todolistId: string) {
    return instance.delete<ResponseType>(`todo-lists/${todolistId}`);
  },

  updateTodolist(todolistId: string, title: string) {
    return instance.put<ResponseType>(`todo-lists/${todolistId}`, { title });
  },

  getTasks(todolistId: string) {
    return instance.get<GetTasksResponse>(`todo-lists/${todolistId}/tasks`);
  },

 createTask(todolistId: string, title: string) {
    return instance.post<ResponseType<{item: TaskType}>>(`todo-lists/${todolistId}/tasks`, {title});
  },

 deleteTask(todolistId: string, taskId: string) {
    return instance.delete<ResponseType>(`todo-lists/${todolistId}/tasks/${taskId}`);
  },

 updateTask(todolistId: string, taskId: string, model: UpdateTaskModelType) {
    return instance.put<ResponseType<{item: TaskType}>>(`todo-lists/${todolistId}/tasks/${taskId}`,model);
  },




};

export type TodolistType = {
  id: string;
  title: string;
  addedDate: string;
  order: number;
};

export type ResponseType<D = {}> = {
  resultCode: number;
  messages: Array<string>;
  data: D;
};

export type TaskType = {
  id: string;
  todoListId: string;
  title: string;
  description: string;
  status: number;
  priority: number;
  startDate: string;
  deadline: string;
  addedDate: string;
  order: number;
//   completed: boolean;
};

export type GetTasksResponse = {
    totalCount: number
    error: string
    items: Array<TaskType>
}

export type UpdateTaskModelType = {
    title: string
    description: string
    status: number
    priority: number
    startDate: string
    deadline: string
}