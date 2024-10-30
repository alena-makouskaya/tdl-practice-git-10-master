import { ChangeEvent, useEffect, useState } from "react";
import { todolistAPI } from "../api/todolists-api";

export default {
  title: "API",
};

export const GetTodolists = () => {
  const [state, setState] = useState<any>(null);

  useEffect(() => {
    todolistAPI.getTodolists().then((res) => setState(res.data));
  }, []);

  return <div>{JSON.stringify(state)}</div>;
};

export const CreateTodolist = () => {
  const [state, setState] = useState<any>(null);
  const [title, setTitle] = useState<string>("");

  const createTodolist = () => {
    todolistAPI.createTodolist(title).then((res) => setState(res.data));
  };

  return (
    <div>
      {JSON.stringify(state)}

      <input
        type="text"
        onChange={(e: ChangeEvent<HTMLInputElement>) =>
          setTitle(e.currentTarget.value)
        }
      />

      <button onClick={createTodolist}>Add Todolist</button>
    </div>
  );
};

export const DeleteTodolist = () => {
  const [state, setState] = useState<any>(null);
  const [todolistId, setTodolistId] = useState<string>("");

  const deleteTodolist = () => {
    todolistAPI.deleteTodolist(todolistId).then((res) => setState(res.data));
  };

  return (
    <div>
      {JSON.stringify(state)}

      <input
        type="text"
        onChange={(e: ChangeEvent<HTMLInputElement>) =>
          setTodolistId(e.currentTarget.value)
        }
      />

      <button onClick={deleteTodolist}>Delete Todolist</button>
    </div>
  );
};

export const UpdateTodolist = () => {
  const [state, setState] = useState<any>(null);
  const [todolistId, setTodolistId] = useState<string>("");
  const [title, setTitle] = useState<string>("");

  const updateTodolist = () => {
    todolistAPI
      .updateTodolist(todolistId, title)
      .then((res) => setState(res.data));
  };

  return (
    <div>
      {JSON.stringify(state)}

      <input
        type="text"
        placeholder="Todolist Id"
        onChange={(e: ChangeEvent<HTMLInputElement>) =>
          setTodolistId(e.currentTarget.value)
        }
      />

      <input
        type="text"
        placeholder="New Todolist Title"
        onChange={(e: ChangeEvent<HTMLInputElement>) =>
          setTitle(e.currentTarget.value)
        }
      />

      <button onClick={updateTodolist}>Update Todolist</button>
    </div>
  );
};

export const GetTasks = () => {
  const [state, setState] = useState<any>(null);
  const [todolistId, setTodolistId] = useState<string>("");

  const getTasks = () => {
    todolistAPI.getTasks(todolistId).then((res) => setState(res.data));
  };

  return (
    <div>
      {JSON.stringify(state)}

      <input
        type="text"
        placeholder="Todolist Id"
        onChange={(e: ChangeEvent<HTMLInputElement>) =>
          setTodolistId(e.currentTarget.value)
        }
      />

      <button onClick={getTasks}>Get Todolist</button>
    </div>
  );
};

export const CreateTask = () => {
  const [state, setState] = useState<any>(null);
  const [todolistId, setTodolistId] = useState<string>("");
  const [title, setTitle] = useState<string>("");

  const createTask = () => {
    todolistAPI.createTask(todolistId, title).then((res) => setState(res.data));
  };

  return (
    <div>
      {JSON.stringify(state)}

      <input
        type="text"
        placeholder="Todolist Id"
        onChange={(e: ChangeEvent<HTMLInputElement>) =>
          setTodolistId(e.currentTarget.value)
        }
      />

      <input
        type="text"
        placeholder="Task Title"
        onChange={(e: ChangeEvent<HTMLInputElement>) =>
          setTitle(e.currentTarget.value)
        }
      />

      <button onClick={createTask}>Create Task</button>
    </div>
  );
};

export const DeleteTask = () => {
  const [state, setState] = useState<any>(null);
  const [todolistId, setTodolistId] = useState<string>("");
  const [taskId, setTaskId] = useState<string>("");

  const deleteTask = () => {
    todolistAPI
      .deleteTask(todolistId, taskId)
      .then((res) => setState(res.data));
  };

  return (
    <div>
      {JSON.stringify(state)}

      <input
        type="text"
        placeholder="Todolist ID"
        onChange={(e: ChangeEvent<HTMLInputElement>) =>
          setTodolistId(e.currentTarget.value)
        }
      />

      <input
        type="text"
        placeholder="Task ID"
        onChange={(e: ChangeEvent<HTMLInputElement>) =>
          setTaskId(e.currentTarget.value)
        }
      />

      <button onClick={deleteTask}>Delete Task</button>
    </div>
  );
};

export const UpdateTask = () => {
  const [state, setState] = useState<any>(null);

  const [todolistId, setTodolistId] = useState<string>("");
  const [taskId, setTaskId] = useState<string>("");

  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [status, setStatus] = useState<number>(0);
  const [priority, setPriority] = useState<number>(0);

  const updateTask = () => {
    todolistAPI
      .updateTask(todolistId, taskId, {
        title: title,
        description: description,
        status: status,
        priority: priority,
        startDate: "",
        deadline: "",
      })
      .then((res) => setState(res.data));
  };

  return (
    <div>
      {JSON.stringify(state)}

      <input
        type="text"
        placeholder="Todolist ID"
        onChange={(e: ChangeEvent<HTMLInputElement>) =>
          setTodolistId(e.currentTarget.value)
        }
      />

      <input
        type="text"
        placeholder="Task ID"
        onChange={(e: ChangeEvent<HTMLInputElement>) =>
          setTaskId(e.currentTarget.value)
        }
      />

      <input
        type="text"
        placeholder="New Task Title"
        onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setTitle(e.currentTarget.value)
        }
      />

      <input
        type="text"
        placeholder="New Task Description"
        onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setDescription(e.currentTarget.value)
        }
      />

      <input
        type="number"
        value={status}
        placeholder="New Task Status"
        onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setStatus(+e.currentTarget.value)
        }
      />

      <input
        type="number"
        value={priority}
        placeholder="New Task Priority"
        onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setPriority(+e.currentTarget.value)
        }
      />

      <button onClick={updateTask}>Update Task</button>
    </div>
  );
};


// 5f2bde22-c76c-4d54-9981-af1032e1558d

// 847fc7a4-bf23-4d9f-8360-fbdff8ff97d8