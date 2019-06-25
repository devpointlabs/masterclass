import React from "react";
import { Header, } from "semantic-ui-react";
import { Link, } from "react-router-dom";

const Comment = () => (
  <Header as="h3" textAlign="center">
    Comment
    <Link to="/"> Home</Link>
  </Header>
);

export default Comment;