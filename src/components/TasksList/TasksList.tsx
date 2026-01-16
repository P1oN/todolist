import { useTaskList } from "../../contexts/TaskListContext/TaskListContext";
import { VerticalList } from "../VerticalList/VerticalList";

const TasksList = () => {
  const { tasks } = useTaskList();

  return (
    <VerticalList>
      {tasks.map((item) => (
        <VerticalList.Item
          key={item.id}
          data-id={item.id}
          data-done={item.done}
        >
          {item.label}
        </VerticalList.Item>
      ))}
    </VerticalList>
  );
};

export { TasksList };
