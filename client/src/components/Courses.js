import React from "react";
import { Header, } from "semantic-ui-react";
import { Link, } from "react-router-dom";

const Courses = () => (
  <Header as="h3" textAlign="center">
    Courses
    <Link to="/"> Home</Link>
  </Header>
);

export default Courses;
