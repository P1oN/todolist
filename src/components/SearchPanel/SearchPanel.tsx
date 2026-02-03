import React from "react";
import { useSearchContext } from "../../contexts/SearchContext";
import { cn } from "../../utils/cn";
import styles from "./styles.module.css";

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {}

const SearchPanel = (props: Props) => {
  const { className, ...rest } = props;
  const { searchValue, setSearchValue } = useSearchContext();
  const [inputValue, setInputValue] = React.useState(searchValue);

  React.useEffect(() => {
    setInputValue(searchValue);
  }, [searchValue]);

  React.useEffect(() => {
    const handle = window.setTimeout(() => {
      setSearchValue(inputValue);
    }, 300);

    return () => window.clearTimeout(handle);
  }, [inputValue, setSearchValue]);

  const onSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  return (
    <input
      type="text"
      name="search"
      className={cn(styles.searchInput, className)}
      placeholder="Type to search"
      aria-label="Search tasks"
      value={inputValue}
      onChange={onSearchChange}
      {...rest}
    />
  );
};

export { SearchPanel };
