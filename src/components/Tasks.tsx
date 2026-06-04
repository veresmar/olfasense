import {  useReducer } from "react";
import Task, { type TaskType } from "./Task";
import { List } from "@mui/material";

type State = {
  tasks: TaskType[];
};
export type Action =
  | { type: "START_SUBTASK"; taskId: number; subtaskId: number }
  | { type: "STOP_SUBTASK"; taskId: number; subtaskId: number }
  | { type: "DONE_SUBTASK"; taskId: number; subtaskId: number };

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "START_SUBTASK":
      return {
        tasks: state.tasks.map(task =>
          task.id !== action.taskId
            ? task
            : {
                ...task,
                subtasks: task.subtasks.map(st =>
                  st.id !== action.subtaskId
                    ? st
                    : {
                        ...st,
                        status: "running",
                        startedAt: Date.now(),
                      }
                ),
              }
        ),
      };

    case "STOP_SUBTASK":
      return {
        tasks: state.tasks.map(task =>
          task.id !== action.taskId
            ? task
            : {
                ...task,
                subtasks: task.subtasks.map(st =>
                  st.id !== action.subtaskId
                    ? st
                    : {
                        ...st,
                        status: "idle",
                        startedAt: null,
                      }
                ),
              }
        ),
      };

    case "DONE_SUBTASK":
      return {
        tasks: state.tasks.map(task =>
          task.id !== action.taskId
            ? task
            : {
                ...task,
                subtasks: task.subtasks.map(st =>
                  st.id !== action.subtaskId
                    ? st
                    : {
                        ...st,
                        status: "done",
                        startedAt: null,
                        elapsed: st.elapsed,
                      }
                ),
              }
        ),
      };

    default:
      return state;
  }
}
const initialState: State = {
  tasks: [
  {
    id: 1,
    title: "Sample lines cleaning",
    subtasks:  [
      {
        id: 11,
        title: "Cleaning with soap",
        duration: 60,
          status: "idle",
          startedAt: null,
          elapsed: 0
      },
      {
        id: 12,
        title: "Cleaning with hydrogen peroxide",
        duration: 90,
          status: "idle",
          startedAt: null,
          elapsed: 0
      },
      {
        id: 13,
        title: "Cleaning with soap",
        duration: 60,
          status: "idle",
          startedAt: null,
          elapsed: 0
      },
      {
        id: 14,
        title: "Cleaning with hydrogen peroxide",
        duration: 90,
          status: "idle",
          startedAt: null,
          elapsed: 0
      }
    ]
  },
  {
    id: 2,
    title: "Sonic bath cleaning",
    subtasks: [
      {
        id: 21,
        title: "Cleaning with soap",
        duration: 60,
          status: "idle",
          startedAt: null,
          elapsed: 0
      },
      {
        id: 22,
        title: "Cleaning with hydrogen peroxide",
        duration: 90,
          status: "idle",
          startedAt: null,
          elapsed: 0
      },
      {
        id: 23,
        title: "Cleaning with soap",
        duration: 60,
          status: "idle",
          startedAt: null,
          elapsed: 0
      },
      {
        id: 24,
        title: "Cleaning with hydrogen peroxide",
        duration: 90,
          status: "idle",
          startedAt: null,
          elapsed: 0
      }
    ]
  },
  {
    id: 3,
    title: "Eq charge",
    subtasks: [
      {
        id: 31,
        title: "Cleaning with soap",
        duration: 60,
          status: "idle",
          startedAt: null,
          elapsed: 0
      },
      {
        id: 32,
        title: "Cleaning with hydrogen peroxide",
        duration: 90,
          status: "idle",
          startedAt: null,
          elapsed: 0
      },
      {
        id: 33,
        title: "Cleaning with soap",
        duration: 60,
          status: "idle",
          startedAt: null,
          elapsed: 0
      },
      {
        id: 34,
        title: "Cleaning with hydrogen peroxide",
        duration: 90,
          status: "idle",
          startedAt: null,
          elapsed: 0
      }
    ]
  }
]};

export default function Tasks() {
  const [state, dispatch] = useReducer(reducer, initialState);
  
  return (
    <List dense component="div" role="list">
      {state.tasks.map((task) => (
        <Task key={task.id} task={task} dispatch={dispatch} />
      ))}
    </List>
  );
}