import React from "react";
import { useTaskList } from "../../contexts/TaskListContext/TaskListContext";
import { createTodoItem } from "../../contexts/TaskListContext/utils";
import { useFilterContext } from "../../contexts/FilterContext";
import { useSearchContext } from "../../contexts/SearchContext";
import styles from "./styles.module.css";

const ItemAddForm = () => {
  const { addTask } = useTaskList();
  const { onFilterChange } = useFilterContext();
  const { setSearchValue } = useSearchContext();

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!e.target || !(e.target instanceof HTMLFormElement)) return;

    const formData = new FormData(e.target);
    const label = String(formData.get("task-label") ?? "").trim();

    if (!label) return;

    addTask(createTodoItem(label, Date.now()));
    onFilterChange("all");
    setSearchValue("");
    e.target.reset();
    e.target.querySelector("input")?.focus();
  };

  return (
    <form className={styles.itemAddForm} onSubmit={onSubmit}>
      <div className={styles.inputContainer}>
        <label htmlFor="task-label" className="sr-only">
          Task
        </label>
        <input
          type="text"
          id="task-label"
          name="task-label"
          placeholder="What’s your next small step?"
          aria-label="Task"
        />
        <button type="submit" aria-label="Add item">
          + Add task
        </button>
      </div>
      <p className={styles.hint}>
        Just for you. Your tasks stay in this browser.
      </p>
    </form>
  );
};

export { ItemAddForm };
