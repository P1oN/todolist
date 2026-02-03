import React, { createContext, useContext, useEffect, useState } from "react";

const filterNames = ["all", "active", "done"] as const;
export type FilterType = (typeof filterNames)[number];

interface FilterContextType {
  filter: FilterType;
  onFilterChange: (filter: FilterType) => void;
}

const FilterContext = createContext<FilterContextType | undefined>(undefined);

interface Props extends React.PropsWithChildren {}

const STORAGE_KEY = "todolist.filter";

const loadFilter = (): FilterType => {
  if (typeof window === "undefined") return "all";
  const stored = window.localStorage.getItem(STORAGE_KEY);
  if (stored && filterNames.includes(stored as FilterType)) {
    return stored as FilterType;
  }
  return "all";
};

const FilterContextProvider: React.FC<Props> = ({ children }) => {
  const [filter, setFilter] = useState<FilterType>(loadFilter);

  const onFilterChange = (newFilter: FilterType) => {
    setFilter(newFilter);
  };

  useEffect(() => {
    if (typeof window === "undefined") return;
    window.localStorage.setItem(STORAGE_KEY, filter);
  }, [filter]);

  return (
    <FilterContext.Provider value={{ filter, onFilterChange }}>
      {children}
    </FilterContext.Provider>
  );
};

const useFilterContext = () => {
  const context = useContext(FilterContext);
  if (!context) {
    throw new Error(
      "useFilterContext must be used within a FilterContextProvider",
    );
  }
  return context;
};

export { FilterContextProvider, useFilterContext, filterNames };
