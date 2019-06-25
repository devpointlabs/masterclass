import React from "react";
import { Header, } from "semantic-ui-react";
import { Link, } from "react-router-dom";

const NoMatch = () => (
  <Header as="h3" textAlign="center">
    Page not found. Return
    <Link to="/"> Home</Link>
  </Header>
);

export default NoMatch;
