import React, { useState, useContext } from "react"
import { Form, Input, Button, Icon, } from "semantic-ui-react"
import {AuthContext} from '../../providers/AuthProvider';
import {Link} from 'react-router-dom'; 
import axios from 'axios'; 


const Search = (props) => {
  const [search, setSearch] = useState('')
  const { setSearchResults } = useContext(AuthContext)

    // Search by title, overview, and category 
    const searchCourses =(e, search,) => {
      e.preventDefault()
      axios.get(`/api/search_courses?search=${search}`)
        .then(res => {
          debugger
          setSearchResults(res.data)
          props.history.push("/search")
        })
    }

  
  return (
    <Form onSubmit={props.searchCourses}>
      <Input
        placeholder="Search for anything..."
        onChange={ (e) => setSearch(e.target.value) }
      />
      <Button 
        icon 
        circular
        floated="right" 
        onClick={ (e) => searchCourses(e, search) }
      >
        <Icon circular name="search" />
      </Button>
    </Form>
  )
}

export default Search;
