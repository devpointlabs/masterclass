import React, { useState } from "react";
import axios from 'axios';

export const SearchContext = React.createContext();
export const SearchConsumer = SearchContext.Consumer;

export const SearchProvider = (props) => {
  const [searchResults, setSearchResults] = useState([]);
  const [search, setSearch] = useState("");







  return (
    <SearchContext.Provider
      value={{
        searchResults, 
        setSearchResults: (search) => setSearchResults(search),
        search, 
        setSearch: (result => setSearch(result)), 
      }}
    >
      {props.children}
    </SearchContext.Provider>
  );
}

export default SearchProvider;