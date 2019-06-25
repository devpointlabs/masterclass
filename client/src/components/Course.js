import React from "react";
import { Header, } from "semantic-ui-react";
import { Link, } from "react-router-dom";

const Course = () => (
  <Header as="h3" textAlign="center">
    Course
    <Link to="/"> Home</Link>
  </Header>
);

export default Course;
