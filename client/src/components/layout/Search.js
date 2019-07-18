import React, { useState, useContext, useEffect } from "react";
import { Form, Input, Button, Icon, Popup, Message } from "semantic-ui-react";
import { SearchContext } from "../../providers/SearchProvider";
import axios from "axios";

const Search = (props) => {
  // const [search, setSearch] = useState("");
  const { searchResults, setSearchResults, search, setSearch,} = useContext(SearchContext);
  const [showClearButton, setShowClearButton ] = useState(false); 
  const [alert, setAlert] = useState(false); 
  const [timer, setTimer] = useState(false)

  // Search by title, overview, and category
  const searchCourses = (e, search) => {
    // setSearch("")
    e.preventDefault();
    if(search.length === 0 ){
      setAlert(true); 
    } else {
    axios.get(`/api/search_courses?search=${search}`)
    .then((res) => {
      setSearchResults(res.data);
      props.history.push("/search");
      // showClear() 
    });
  }
  };

  // const clearResults = () => {
  //   // clear search results and set loader to false 
  //   setSearchResults([]); 
  // }

  

  // const showClear = () => {
  //   if(searchResults.length > 0 ) {
  //     setShowClearButton(true) 
  //   } else 
  //   setShowClearButton(false)
  // }
  useEffect(()=>{
    const interval = setInterval(()=>{
      setAlert(false)
    },3000)
    return () => clearInterval(interval)
  },[timer])

  const renderMessage = () => {
    return (
      <Message negative>
        <Message.Header>Sorry!</Message.Header>
        <p>Please enter an item to search</p>
      </Message>
    )
  }

  const clearInput = () => {
    setSearch("")
  }

  return (
    <>
    {alert && renderMessage()
    }
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
      {search.length >= 22 && <Button floated="right" onClick={(e) => clearInput()}>X</Button>}
      {/* <Button floated="right" onClick={(e) => clearResults()}>Clear</Button>  */}
    </Form>
    </>
  );
};

export default Search;
