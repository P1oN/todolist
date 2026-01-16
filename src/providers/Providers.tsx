import { FilterContextProvider } from "../contexts/FilterContext";
import { SearchContextProvider } from "../contexts/SearchContext";
import { TaskListProvider } from "../contexts/TaskListContext/TaskListContext";

interface Props extends React.PropsWithChildren {}

const Providers = ({ children }: Props) => {
  return (
    <FilterContextProvider>
      <SearchContextProvider>
        <TaskListProvider>{children}</TaskListProvider>
      </SearchContextProvider>
    </FilterContextProvider>
  );
};

export { Providers };
