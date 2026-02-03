import React from "react";
import { getDataId } from "./utils";
import styles from "./styles.module.css";
import { cn } from "../../../../utils/cn";
import { useTaskList } from "../../../../contexts/TaskListContext/TaskListContext";

interface Props
  extends React.HTMLAttributes<HTMLLIElement>, React.PropsWithChildren {}

const Item = (props: Props) => {
  const { children, ...rest } = props;

  const { removeTask, updateTask } = useTaskList();

  function handleItemClick(event: React.MouseEvent<HTMLLIElement>) {
    event.stopPropagation();

    const id = getDataId(event.currentTarget);
    const isDone = event.currentTarget.dataset.done === "true";

    if (id === null || isDone === null) {
      return;
    }

    updateTask(id, { done: !isDone });
  }

  function handleItemDelete(event: React.MouseEvent<HTMLButtonElement>) {
    event.stopPropagation();

    const parent = event.currentTarget.parentElement;

    if (!parent) return;

    const id = getDataId(parent);
    if (id !== null) removeTask(id);
  }

  return (
    <li className={styles.todoListItem} onClick={handleItemClick} {...rest}>
      <span className={styles.todoListItemLabel}>{children}</span>
      <button
        type="button"
        className={cn(styles.btn, styles.btnOutlineDanger, styles.btnSmall)}
        onClick={handleItemDelete}
        aria-label="Delete task"
      >
        <i className="fa fa-trash-o" />
      </button>
    </li>
  );
};

export { Item };
