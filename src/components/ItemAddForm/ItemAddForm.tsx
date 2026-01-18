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
    const label = formData.get("task-label");

    if (!label) return;

    addTask(createTodoItem(label as string, Date.now()));
    e.target.reset();
  };

  return (
    <form className={styles.itemAddForm} onSubmit={onSubmit}>
      <div className={styles.inputContainer}>
        <input
          type="text"
          name="task-label"
          placeholder="What needs to be done"
        />
        <button type="submit">Add Item</button>
      </div>
    </form>
  );
};

export { ItemAddForm };
