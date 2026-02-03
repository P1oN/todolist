import type { FilterType } from "../FilterContext";
import type { Task } from "../../types/task";

export const createTodoItem = (label: string, id: number, done = false) => {
  return {
    label,
    done,
    id,
  };
};

export const searchTasks = (items: Array<Task>, text: string) => {
  if (text.length === 0) {
    return items;
  }
  return items.filter((item) => {
    return item.label.toLowerCase().indexOf(text.toLowerCase()) > -1;
  });
};

export const filterTasks = (items: Array<Task>, filter: FilterType) => {
  if (filter === "all") {
    return items;
  }
  if (filter === "done") {
    return items.filter((item) => item.done);
  }
  if (filter === "active") {
    return items.filter((item) => !item.done);
  }

  return items;
};
