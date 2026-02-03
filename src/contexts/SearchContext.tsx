import React from "react";

interface SearchContextType {
  searchValue: string;
  setSearchValue: (value: string) => void;
}

const SearchContext = React.createContext<SearchContextType | undefined>(
  undefined,
);

interface Props extends React.PropsWithChildren {}

const STORAGE_KEY = "todolist.search";

const loadSearch = () => {
  if (typeof window === "undefined") return "";
  return window.localStorage.getItem(STORAGE_KEY) ?? "";
};

const SearchContextProvider = ({ children }: Props) => {
  const [searchValue, setSearchValue] = React.useState(loadSearch);

  React.useEffect(() => {
    if (typeof window === "undefined") return;
    window.localStorage.setItem(STORAGE_KEY, searchValue);
  }, [searchValue]);

  return (
    <SearchContext.Provider value={{ searchValue, setSearchValue }}>
      {children}
    </SearchContext.Provider>
  );
};

const useSearchContext = () => {
  const context = React.useContext(SearchContext);
  if (!context) {
    throw new Error(
      "useSearchContext must be used within a SearchContextProvider",
    );
  }
  return context;
};

export { useSearchContext, SearchContextProvider };
