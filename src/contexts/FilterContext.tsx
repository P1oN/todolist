import React, { createContext, useContext, useState } from "react";

const filterNames = ["all", "active", "done"] as const;
export type FilterType = (typeof filterNames)[number];

interface FilterContextType {
  filter: FilterType;
  onFilterChange: (filter: FilterType) => void;
}

const FilterContext = createContext<FilterContextType>({
  filter: "all",
  onFilterChange: () => {},
});

interface Props extends React.PropsWithChildren {}

const FilterContextProvider: React.FC<Props> = ({ children }) => {
  const [filter, setFilter] = useState<FilterType>("all");

  const onFilterChange = (newFilter: FilterType) => {
    setFilter(newFilter);
  };

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
