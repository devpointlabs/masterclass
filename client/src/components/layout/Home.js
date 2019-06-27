import React, {Fragment, useState, } from "react";
import Courses from '../Courses';
import { Header, Segment, Card, } from "semantic-ui-react";

const Home = () => {
  const [heading, setHeading] = useState("Browse Courses")




return (
  <Fragment> 
  <Header as="h2" textAlign="center">
    Dev Point Labs MasterClass
  </Header>
  <Segment> 
    Course Showcase/Preview will render here
  </Segment>
  <Segment> 
    <Header as="h3" textAlign="center">{heading}</Header>
    <Card.Group itemsPerRow="2"> 
      <Courses/> 
    </Card.Group>
  </Segment>
  </Fragment>
);
}
export default Home;