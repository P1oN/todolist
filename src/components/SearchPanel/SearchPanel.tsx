import React from "react";
import { useSearchContext } from "../../contexts/SearchContext";
import { cn } from "../../utils/cn";
import styles from "./styles.module.css";

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {}

const SearchPanel = (props: Props) => {
  const { className, ...rest } = props;
  const { searchValue, setSearchValue } = useSearchContext();

  const onSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const term = e.target.value;
    setSearchValue(term);
  };

  return (
    <input
      type="text"
      name="search"
      className={cn(styles.searchInput, className)}
      placeholder="Type to search"
      value={searchValue}
      onChange={onSearchChange}
      {...rest}
    />
  );
};

export { SearchPanel };
