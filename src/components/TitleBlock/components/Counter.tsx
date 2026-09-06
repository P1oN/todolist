import { useTaskList } from "../../../contexts/TaskListContext/TaskListContext";
import styles from "../styles.module.css";
const Counter = () => {
  const { rawTasks } = useTaskList();
  const done = rawTasks.filter((task) => task.done).length;
  if (!rawTasks.length) return null;
  return (
    <div className={styles.progress}>
      <div className={styles.progressLabel} aria-live="polite">
        <span>
          {done} of {rawTasks.length} completed
        </span>
        <span>
          {done === rawTasks.length
            ? "Nicely done."
            : `${rawTasks.length - done} to go`}
        </span>
      </div>
      <progress
        value={done}
        max={rawTasks.length}
        aria-label="Tasks completed"
      />
    </div>
  );
};
export { Counter };
