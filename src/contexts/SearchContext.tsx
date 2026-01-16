import React from "react";

interface SearchContextType {
  searchValue: string;
  setSearchValue: (value: string) => void;
}

const SearchContext = React.createContext<SearchContextType>({
  searchValue: "",
  setSearchValue: () => {},
});

interface Props extends React.PropsWithChildren {}

const SearchContextProvider = ({ children }: Props) => {
  const [searchValue, setSearchValue] = React.useState("");

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
