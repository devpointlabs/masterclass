import React, { useState, useContext } from "react";
import { Form, Input, Button, Icon } from "semantic-ui-react";
import { SearchContext } from "../../providers/SearchProvider";
import axios from "axios";

const Search = (props) => {
  // const [search, setSearch] = useState("");
  const { searchResults, setSearchResults, search, setSearch} = useContext(SearchContext);
  const [showClearButton, setShowClearButton ] = useState(false)

  // Search by title, overview, and category
  const searchCourses = (e, search) => {
    // setSearch("")
    e.preventDefault();
    axios.get(`/api/search_courses?search=${search}`)
    .then((res) => {
      setSearchResults(res.data);
      props.history.push("/search");
      // showClear() 
    });
  };

  const clearResults = () => {
    // clear search results and set loader to false 
    setSearchResults([]); 
  }

  

  // const showClear = () => {
  //   if(searchResults.length > 0 ) {
  //     setShowClearButton(true) 
  //   } else 
  //   setShowClearButton(false)
  // }

  return (
    <Form onSubmit={props.searchCourses}>
      <Input 
      placeholder="Search for anything..." 
      onChange={(e) => setSearch(e.target.value)} 
      value = {search}
      // name = 'search'
      />
      <Button icon circular floated="right" onClick={(e) => searchCourses(e, search)}>
        <Icon circular name="search" />
      </Button>
      {/* {showClearButton &&  */}
      <Button floated="right" onClick={(e) => clearResults()}>Clear</Button> 
    </Form>
  );
};

export default Search;
