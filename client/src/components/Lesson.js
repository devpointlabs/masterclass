import React from "react";
import { Header, } from "semantic-ui-react";
import { Link, } from "react-router-dom";

const Lesson = () => (
  <Header as="h3" textAlign="center">
    Lesson
    <Link to="/"> Home</Link>
  </Header>
);

export default Lesson;