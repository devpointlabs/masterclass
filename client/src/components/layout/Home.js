import React, { Fragment, useState, } from "react";
import Courses from '../Courses';
import { Header, Segment, Card, } from "semantic-ui-react";
import styled from 'styled-components';
import HeaderText from '../HeaderText'
import Logo from '../Images/Logo.png';
// import { useSpring, animated } from 'react-spring'


const Home = () => {
  const [heading, ] = useState("Browse Courses")
  // const props = useSpring({opacity:1, from:{opacity: 0}, config:{delay: 1000, duration: 5000},})

  return (
    <Fragment>
      <AppContainer>
      {/* <animated.div style={props}> */}
        <Header textAlign="center" as={HeaderText} fSize="large">
          Dev Point Labs MasterClass
          <img src={Logo}></img>
        </Header>
    {/* </animated.div> */}
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