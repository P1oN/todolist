import { describe, it, expect } from "vitest";
import { createTodoItem, filterTasks, searchTasks } from "./utils";
import type { Task } from "../../types/task";

describe("TaskListContext utils", () => {
  it("createTodoItem builds a task with defaults", () => {
    expect(createTodoItem("Test", 1)).toEqual({
      label: "Test",
      done: false,
      id: 1,
    });
  });

  it("searchTasks filters by label case-insensitively", () => {
    const items: Task[] = [
      { id: 1, label: "Alpha", done: false },
      { id: 2, label: "Bravo", done: true },
    ];

    expect(searchTasks(items, "al")).toHaveLength(1);
    expect(searchTasks(items, "AL")[0].id).toBe(1);
    expect(searchTasks(items, "")).toHaveLength(2);
  });

  it("filterTasks filters by done/active", () => {
    const items: Task[] = [
      { id: 1, label: "Alpha", done: false },
      { id: 2, label: "Bravo", done: true },
    ];

    expect(filterTasks(items, "all")).toHaveLength(2);
    expect(filterTasks(items, "active")).toEqual([items[0]]);
    expect(filterTasks(items, "done")).toEqual([items[1]]);
  });
});
