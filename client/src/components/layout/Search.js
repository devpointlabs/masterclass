import React, { useState, useContext } from "react"
import { Form, Input, Button, Icon, } from "semantic-ui-react"
import {AuthContext} from '../../providers/AuthProvider';


const Search = (props) => {
  const [search, setSearch] = useState('')
  const {searchCourses } = useContext(AuthContext)

  
  return (
    <Form onSubmit={props.searchCourses}>
      <Input
        placeholder="Search for..."
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
