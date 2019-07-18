import React, {useContext} from 'react'; 
import {AuthContext} from '../providers/AuthProvider';
import { Container, Card, Image, Icon } from 'semantic-ui-react';

const SearchPage = () => {
  const { searchResults } = useContext(AuthContext)
  const defaultImage = 'https://icon-library.net//images/no-image-icon/no-image-icon-13.jpg'


  return (
    <Container>
      {searchResults.map(result => (
        <Card fluid key={result.id}>
          <Image src={result.image || defaultImage} size="tiny" floated="left"/>
          <Card.Header textAlign="center">{result.title}</Card.Header>
          <p>{result.overview}</p>
          <Card.Content extra>{result.category}</Card.Content>
        </Card>
      ))}
    </Container>
  )
}

export default SearchPage
