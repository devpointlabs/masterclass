import React, {useState, useContext} from 'react'; 
import {AuthContext} from '../providers/AuthProvider';
import { Container, Card, Image, Icon } from 'semantic-ui-react';

const SearchPage = () => {
  const { searchResults } = useContext(AuthContext);
  let counter = 0
  const defaultImage = 'https://icon-library.net//images/no-image-icon/no-image-icon-13.jpg'

  // count searchResults 
  const countResults = () => {
    for(var i = 0; i < searchResults.length; i++){
      counter++
    }
  }


  return (
    <>
    {countResults()}
    <Container>
      {(counter === 0 ) ? <h1>Sorry! There are no results!</h1> :  <h1>There are {counter} results matching your search!</h1> }
      {searchResults.map(result => (
        <Card fluid key={result.id}>
          <Image src={result.image || defaultImage} size="tiny" floated="left"/>
          <Card.Header textAlign="center">{result.title}</Card.Header>
          <p>{result.overview}</p>
          <Card.Content extra>{result.category}</Card.Content>
        </Card>
      ))}
    </Container>
    </>
  )
}

export default SearchPage
