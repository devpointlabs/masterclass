import React, {useContext} from 'react'; 
import {SearchContext} from '../providers/SearchProvider';
import { Container, Card, Image, Icon, Grid } from 'semantic-ui-react';
import NoSearch from './Images/noSearch.svg'
import {Link} from 'react-router-dom'; 
import styled from 'styled-components'; 

const SearchPage = () => {
  const { searchResults, search } = useContext(SearchContext);
  let counter = 0
  const defaultImage = 'https://icon-library.net//images/no-image-icon/no-image-icon-13.jpg'

  // count searchResults 
  const countResults = () => {
    for(var i = 0; i < searchResults.length; i++){
      counter++
    }
  }

  const noResults = () => {
    return (
      <>
      <div style={{height: "100%", width: "100%"}}>
      <Image centered size="large" src={NoSearch} style={{paddingTop: "25px"}}/>
      <h1 style={{textAlign: "center", paddingBottom: "7rem", paddingTop: "3rem", fontFamily: 'Nunito Sans', fontWeight:"bolder", letterSpacing: "2px", fontSize: "40px", color: "#fff"}}>Sorry! There were no results found!</h1>
      </div>
      </>
    )
  }


  return (
    <>
    {countResults()}
    <SearchContainer>
      {(counter === 0 ) ? noResults() :  <h1 style={{paddingTop: "20px", paddingLeft: "20px", paddingBottom: "20px", borderBottom: "1px solid #fff", fontFamily: "'Nunito Sans'", fontSize: "30px", letterSpacing: "2px", color: "#fff"}}>There are <span style={{color: "#a356e8"}}>{counter}</span> results matching <span style={{color: "#a356e8"}}>{search || "your search"}</span></h1> }
      <Grid columns={1}>
        <Grid.Row>
      {searchResults.map(result => (
        // <Card fluid key={result.id}>
        //   <Image src={result.image || defaultImage} size="tiny" floated="left"/>
        //   <Card.Header textAlign="center">{result.title}</Card.Header>
        //   <p>{result.overview}</p>
        //   <Card.Content extra>{result.category}</Card.Content>
        // </Card>
        <Grid.Column>
        <Container key={result.id} style={{width: "90vh",}} >
            <Link to={{ pathname: `/courses/${result.id}` }} >
            <Image fluid src={result.image || defaultImage}/>
            <div style={{display: "flex", justifyContent: "flex-start", flexDirection: "column", background: "#5a5a5a"}}>
              <h1 style={{textSize: "2rem", color: "#fff", paddingTop: "10px", paddingLeft: "5px", fontFamily: "'Merriweather'"}}>{result.title}</h1>
              <p style={{padding: "10px", fontSize: "1.5rem", color:"#fff", fontFamily: "'Nunito Sans'"}}><div dangerouslySetInnerHTML={{__html: result.overview || "Overview coming soon..."}}></div></p>
              <p style={{padding: "10px", fontSize: "1.2rem", color:"#ba81ee", fontFamily: "'Nunito Sans'", fontWeight: "bolder"}}>{result.category}</p>
            </div>
              </Link>
        </Container>
        <br/>
        <br/>
        </Grid.Column>
      ))}

      </Grid.Row>
      </Grid>
      </SearchContainer>
    </>
  )
}

const SearchContainer = styled.div`
background: #323232; 
width: 100% important!;
height: 100% important!;  
/* height: 100vh;  */
`

export default SearchPage
