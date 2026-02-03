import { FilterContextProvider } from "../contexts/FilterContext";
import { SearchContextProvider } from "../contexts/SearchContext";
import { SettingsContextProvider } from "../contexts/SettingsContext";
import { TaskListProvider } from "../contexts/TaskListContext/TaskListContext";

interface Props extends React.PropsWithChildren {}

const Providers = ({ children }: Props) => {
  return (
    <SettingsContextProvider>
      <FilterContextProvider>
        <SearchContextProvider>
          <TaskListProvider>{children}</TaskListProvider>
        </SearchContextProvider>
      </FilterContextProvider>
    </SettingsContextProvider>
  );
};

export { Providers };
