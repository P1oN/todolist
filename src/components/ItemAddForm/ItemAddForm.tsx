import React from "react";
import { useTaskList } from "../../contexts/TaskListContext/TaskListContext";
import { createTodoItem } from "../../contexts/TaskListContext/utils";
import styles from "./styles.module.css";

interface Props extends React.ComponentProps<"form"> {}

const ItemAddForm = (props: Props) => {
  const { addTask } = useTaskList();

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!e.target || !(e.target instanceof HTMLFormElement)) return;

    const formData = new FormData(e.target);
    const label = String(formData.get("task-label") ?? "").trim();

    if (!label) return;

    addTask(createTodoItem(label, Date.now()));
    e.target.reset();
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
          placeholder="What needs to be done"
          aria-label="Task"
        />
        <button type="submit">Add Item</button>
      </div>
    </form>
  );
};

export { ItemAddForm };
