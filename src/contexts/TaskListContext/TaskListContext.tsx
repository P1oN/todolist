import React from "react";
import { useFilterContext } from "../FilterContext";
import { useSearchContext } from "../SearchContext";
import { createTodoItem, filterTasks, searchTasks } from "./utils";
import type { Task } from "../../types/task";

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
  updateTask: (id: number, task: Partial<Omit<Task, "id">>) => void;
}

const TaskListContext =
  React.createContext<TaskListContextType | undefined>(undefined);

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
      payload: { id: Task["id"]; changes: Partial<Omit<Task, "id">> };
    };

const taskListReducer = (state: Array<Task>, action: TaskAction) => {
  switch (action.type) {
    case "ADD":
      return [...state, action.payload];
    case "REMOVE":
      return state.filter((task) => task.id !== action.payload);
    case "UPDATE":
      return state.map((item) =>
        item.id === action.payload.id
          ? { ...item, ...action.payload.changes }
          : item,
      );
    default:
      return state;
  }
};

interface Props extends React.PropsWithChildren {}

const STORAGE_KEY = "todolist.tasks";

const loadTasks = (): Array<Task> | null => {
  if (typeof window === "undefined") return null;
  const raw = window.localStorage.getItem(STORAGE_KEY);
  if (!raw) return null;
  try {
    const parsed = JSON.parse(raw) as Array<Task>;
    if (!Array.isArray(parsed)) return null;
    return parsed.filter(
      (item) =>
        typeof item?.id === "number" &&
        typeof item?.label === "string" &&
        typeof item?.done === "boolean",
    );
  } catch {
    return null;
  }
};

const saveTasks = (tasks: Array<Task>) => {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
};

const TaskListProvider = (props: Props) => {
  const { children } = props;
  const [tasks, dispatch] = React.useReducer(
    taskListReducer,
    defaultTaskList,
    (initial) => loadTasks() ?? initial,
  );

  const { filter } = useFilterContext();
  const { searchValue } = useSearchContext();

  const addTask = (task: Task) => {
    dispatch({ type: "ADD", payload: task });
  };

  const removeTask = (id: number) => {
    dispatch({ type: "REMOVE", payload: id });
  };

  const updateTask = (id: number, task: Partial<Omit<Task, "id">>) => {
    dispatch({ type: "UPDATE", payload: { id, changes: task } });
  };

  const filteredTasks = searchTasks(filterTasks(tasks, filter), searchValue);

  React.useEffect(() => {
    saveTasks(tasks);
  }, [tasks]);

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
