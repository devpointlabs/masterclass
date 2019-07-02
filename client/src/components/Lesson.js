import React from "react";
import { Header, } from "semantic-ui-react";
import { Link, } from "react-router-dom";
import Videos from "./Videos"

const Lesson = (props) => (
  <Header as="h3" textAlign="center">
    You have finally hit the Lesson itself
    <Videos {...props} />
    <Link to="/"> Home</Link>
  </Header>
);

export default Lesson;