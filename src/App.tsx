import React, { useEffect } from "react";

import "./App.css";
import { TaskType } from "./api/todolists-api";
import { Main } from "./app/Main";

export type TasksStateType = {
  [key: string]: TaskType[];
};

const App = React.memo(() => {
  return (
    <div>
      <Main />
    </div>
  );
});

export default App;
