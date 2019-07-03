import React, { Fragment, useState, } from "react";
import Courses from '../Courses';
import { Header, Segment, Card, } from "semantic-ui-react";
import styled from 'styled-components';
import Styles from '../Styles'

const Home = () => {
  const [heading, setHeading] = useState("Browse Courses")




  return (
    <Fragment>
      <AppContainer>
        <Header textAlign="center" as={Styles} fSize="large">
          Dev Point Labs MasterClass
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