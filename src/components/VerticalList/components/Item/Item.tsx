import React from "react";
import styles from "./styles.module.css";
import { useTaskList } from "../../../../contexts/TaskListContext/TaskListContext";
interface Props extends React.HTMLAttributes<HTMLLIElement> {
  taskId: number;
  done: boolean;
  label: string;
}
const Item = ({ taskId, done, label, ...rest }: Props) => {
  const { removeTask, updateTask } = useTaskList();
  return (
    <li className={styles.todoListItem} data-done={done} {...rest}>
      <label className={styles.taskLabel}>
        <input
          type="checkbox"
          checked={done}
          onChange={(event) =>
            updateTask(taskId, { done: event.target.checked })
          }
        />
        <span className={styles.check} aria-hidden="true">
          {done ? "✓" : ""}
        </span>
        <span className={styles.todoListItemLabel}>{label}</span>
      </label>
      <button
        type="button"
        className={styles.deleteButton}
        onClick={() => removeTask(taskId)}
        aria-label={`Delete task: ${label}`}
      >
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          aria-hidden="true"
        >
          <path d="M4 7h16M9 7V4h6v3M6 7l1 13h10l1-13M10 10v7m4-7v7" />
        </svg>
      </button>
    </li>
  );
};
export { Item };
