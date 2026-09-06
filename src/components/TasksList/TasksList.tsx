import { useTaskList } from "../../contexts/TaskListContext/TaskListContext";
import { useSearchContext } from "../../contexts/SearchContext";
import { useFilterContext } from "../../contexts/FilterContext";
import { VerticalList } from "../VerticalList/VerticalList";
import styles from "./styles.module.css";
const TasksList = () => {
  const { tasks, rawTasks } = useTaskList();
  const { searchValue } = useSearchContext();
  const { filter } = useFilterContext();
  if (!tasks.length)
    return (
      <div className={styles.empty} role="status">
        <span aria-hidden="true">{searchValue ? "⌕" : "✓"}</span>
        <h4>
          {searchValue
            ? "No matching tasks"
            : !rawTasks.length
              ? "A little room to begin."
              : filter === "done"
                ? "Good things take small steps."
                : "All clear. Take a breath."}
        </h4>
        <p>
          {searchValue
            ? "Try another word or clear your search."
            : !rawTasks.length
              ? "Add your first task below. Keep it simple."
              : filter === "done"
                ? "Your completed tasks will appear here."
                : "You’ve finished your active tasks."}
        </p>
      </div>
    );
  return (
    <VerticalList aria-label="Tasks">
      {tasks.map((item) => (
        <VerticalList.Item
          key={item.id}
          taskId={item.id}
          done={item.done}
          label={item.label}
        />
      ))}
    </VerticalList>
  );
};
export { TasksList };
