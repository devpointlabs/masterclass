import React, { useState, useContext, useEffect } from "react";
import { Form, Input, Menu, Button, Icon, Popup, Message } from "semantic-ui-react";
import { SearchContext } from "../../providers/SearchProvider";
import styled from 'styled-components'
import axios from "axios";

const Search = (props) => {
  // const [search, setSearch] = useState("");
  const { searchResults, setSearchResults, search, setSearch,} = useContext(SearchContext);
  const [showClearButton, setShowClearButton ] = useState(false); 
  const [alert, setAlert] = useState(false); 
  const [timer, setTimer] = useState(false)

  // Search by title, overview, and category
  const searchCourses = (e, search) => {
    debugger
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
   
    <Menu.Item
    onClick={(e)=>searchCourses(e, search)}
    >
      <Input 
      action ={{type: "submit", }} 
      placeholder='Search ...' 
      icon='search'
      onChange={(e)=> setSearch(e.target.value)}
      value={search}
      
      />
    </Menu.Item>
    </>
  );
};


const StyledInput = styled(Input)`
  display:flex;
  font-size: 16px;
  border: solid 1px #dbdbdb;
  border-radius: 3px;
  color: #262626;

  /* padding: 7px 33px; */
  /* border-radius: 3px;
  color: #ddd; */
  /* cursor: text;
  font-size: 14px;
  font-weight: 300;
  text-align: center;
  background: #333; */

  &:active,
  &:focus {
    text-align: left;
  }
`

const StyledForm = styled(Form)`
  float: center; 
  /* width: "20%"; */
  text-align: center;
`

export default Search;
