import React, { Fragment, useState, } from "react";
import Courses from '../Courses';
import { Header, Segment, Card, } from "semantic-ui-react";
import styled from 'styled-components';
import HeaderText from '../HeaderText'
import Logo from '../Images/Logo.png';


const Home = () => {
  const [heading, setHeading] = useState("Browse Courses")


  return (
    <Fragment>
      <AppContainer>
        <Header textAlign="center" as={HeaderText} fSize="large">
          Dev Point Labs MasterClass
          <img src={Logo}></img>
        </Header>
        <Segment>
          Course Showcase/Preview will render here
          </Segment>
        <Segment>
          <Header as="h3" textAlign="center">{heading}</Header>
          <Card.Group itemsPerRow="2">
            <Courses />
          </Card.Group>
        </Segment>
      </AppContainer>
    </Fragment>

  );
}

const AppContainer = styled.div`
  background: linear-gradient(to bottom right, aliceblue, black);
`;


export default Home;

const styles = [


]




{/* <Container style={
  { display: 'flex', 
borderColor: "black", 
justifyContent: "space-between", 
width: '100%', 
alignItems: "center", 
paddingTop: "14px", 
borderWidth: ".9px" }
}>
</Container> 
*/ }