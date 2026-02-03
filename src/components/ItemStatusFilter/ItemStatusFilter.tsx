import React from "react";
import type { FilterType } from "../../contexts/FilterContext";
import { useFilterContext, filterNames } from "../../contexts/FilterContext";
import styles from "./styles.module.css";

const buttonsList: Array<{ name: FilterType; label: string }> = [
  { name: "all", label: "All" },
  { name: "active", label: "Active" },
  { name: "done", label: "Done" },
];

interface Props extends React.HTMLAttributes<HTMLDivElement> {}

const ItemStatusFilter = (props: Props) => {
  const { filter, onFilterChange } = useFilterContext();

  const onFilterClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    const name = e.currentTarget.dataset.name;
    if (!name || !filterNames.includes(name as FilterType)) return;

    onFilterChange(name as FilterType);
  };

  return (
    <div className={styles.btnGroup}>
      {buttonsList.map(({ name, label }) => {
        const isActive = filter === name;
        return (
          <button
            key={name}
            data-name={name}
            data-active={isActive}
            type="button"
            onClick={onFilterClick}
            aria-pressed={isActive}
          >
            {label}
          </button>
        );
      })}
    </div>
  );
};

export { ItemStatusFilter };
