import React from "react";
import { Header, } from "semantic-ui-react";
import { Link, } from "react-router-dom";

const CommentForm = () => (
  <Header as="h3" textAlign="center">
    CommentForm
    <Link to="/"> Home</Link>
  </Header>
);

export default CommentForm;