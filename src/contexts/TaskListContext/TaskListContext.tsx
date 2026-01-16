import React from "react";
import { useFilterContext } from "../FilterContext";
import { useSearchContext } from "../SearchContext";
import { createTodoItem, filterTasks, searchTasks } from "./utils";

export interface Task {
  label: string;
  done: boolean;
  id: number;
}

/**
 * @typedef {Object} TaskListContextType
 * @param {Array<Task>} tasks - filtered tasks array with FilterContext and SearchContext
 * @param {Array<Task>} rawTasks - unfiltered tasks array
 */
interface TaskListContextType {
  rawTasks: Array<Task>;
  tasks: Array<Task>;
  addTask: (task: Task) => void;
  removeTask: (id: number) => void;
  updateTask: (id: number, task: Partial<Task>) => void;
}

const defaultTaskListContext: TaskListContextType = {
  rawTasks: [],
  tasks: [],
  addTask: () => {},
  removeTask: () => {},
  updateTask: () => {},
};

const TaskListContext = React.createContext<TaskListContextType>(
  defaultTaskListContext,
);

const defaultTaskList = [
  createTodoItem("First Element", 1),
  createTodoItem("Learn React", 2),
  createTodoItem("Build React App", 3),
];

type TaskAction =
  | {
      type: "ADD";
      payload: Task;
    }
  | {
      type: "REMOVE";
      payload: Task["id"];
    }
  | {
      type: "UPDATE";
      payload: Partial<Task>;
    };

const taskListReducer = (state: Array<Task>, action: TaskAction) => {
  switch (action.type) {
    case "ADD":
      return [...state, action.payload];
    case "REMOVE":
      return state.filter((task) => task.id !== action.payload);
    case "UPDATE":
      return state.map((item) =>
        item.id === action.payload.id ? { ...item, ...action.payload } : item,
      );
    default:
      return state;
  }
};

interface Props extends React.PropsWithChildren {}

const TaskListProvider = (props: Props) => {
  const { children } = props;
  const [tasks, dispatch] = React.useReducer(taskListReducer, defaultTaskList);

  const { filter } = useFilterContext();
  const { searchValue } = useSearchContext();

  const addTask = (task: Task) => {
    dispatch({ type: "ADD", payload: task });
  };

  const removeTask = (id: number) => {
    dispatch({ type: "REMOVE", payload: id });
  };

  const updateTask = (id: number, task: Partial<Task>) => {
    dispatch({ type: "UPDATE", payload: { id, ...task } });
  };

  const filteredTasks = searchTasks(filterTasks(tasks, filter), searchValue);

  return (
    <TaskListContext.Provider
      value={{
        tasks: filteredTasks,
        rawTasks: tasks,
        addTask,
        removeTask,
        updateTask,
      }}
    >
      {children}
    </TaskListContext.Provider>
  );
};

const useTaskList = () => {
  const context = React.useContext(TaskListContext);
  if (!context) {
    throw new Error("useTaskList must be used within a TaskListProvider");
  }
  return context;
};

export { useTaskList, TaskListProvider };
