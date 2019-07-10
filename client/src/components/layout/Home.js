import React, { Fragment, useState, } from "react";
import Courses from '../Courses';
import { Header, Segment, Card, } from "semantic-ui-react";
import styled from 'styled-components';
import HeaderText from '../../Styles/HeaderText'
// import { useSpring, animated } from 'react-spring'


const Home = () => {
  const [heading,] = useState("Courses")
  // const props = useSpring({opacity:1, from:{opacity: 0}, config:{delay: 1000, duration: 5000},})

  return (
    <Fragment>
      <AppContainer >
        {/* <animated.div style={props}> */}
        <Header textAlign="left" as={HeaderText} fSize="large">
          DevPoint <br />
          University

        </Header>
        <Header textAlign="left" as={HeaderText} fSize="small">
          Learn It, Code It, Build It
        </Header>
        <Header textAlign="left" as={HeaderText} fSize="medium">
          Let your SKILLS do the talking.
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
  background-color: rgb(53, 68, 62);
`

const GlobalPadding = styled.div`
padding: 5 em;
`


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