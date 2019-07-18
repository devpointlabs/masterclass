import React, { useState } from "react";
import axios from 'axios';

export const SearchContext = React.createContext();
export const SearchConsumer = SearchContext.Consumer;

export const SearchProvider = (props) => {
  const [searchResults, setSearchResults] = useState([])






  return (
    <SearchContext.Provider
      value={{
        searchResults, 
        setSearchResults: (search) => setSearchResults(search),
        // searchCourses: searchCourses, 
        // updateVideos: updateVideos,
      }}
    >
      {props.children}
    </SearchContext.Provider>
  );
}

export default SearchProvider;