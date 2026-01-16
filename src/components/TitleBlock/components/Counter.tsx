import React from "react";
import { useTaskList } from "../../../contexts/TaskListContext/TaskListContext";

interface Props extends React.HTMLAttributes<HTMLParagraphElement> {}

const Counter = (props: Props) => {
  const { className, ...rest } = props;

  const { tasks } = useTaskList();

  const doneTasksCount = tasks.filter((task) => task.done).length;
  const todoCount = tasks.length - doneTasksCount;

  if (todoCount === 0 && doneTasksCount === 0) {
    return null;
  }

  return (
    <p className={className} {...rest}>
      {todoCount} more to do, {doneTasksCount} done
    </p>
  );
};

export { Counter };
