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

  const onClearSearch = () => {
    setInputValue("");
    setSearchValue("");
  };

  const isClearVisible = inputValue.length > 0;

  return (
    <div className={cn(styles.searchWrapper, className)}>
      <input
        type="text"
        name="search"
        className={styles.searchInput}
        placeholder="Type to search"
        aria-label="Search tasks"
        value={inputValue}
        onChange={onSearchChange}
        {...rest}
      />
      <button
        type="button"
        className={styles.clearButton}
        onClick={onClearSearch}
        disabled={!isClearVisible}
        aria-label="Clear search"
      >
        Clear
      </button>
    </div>
  );
};

export { SearchPanel };
