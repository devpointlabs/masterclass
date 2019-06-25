import React from "react";
import { Header, } from "semantic-ui-react";
import { Link, } from "react-router-dom";

const Enrollment = () => (
  <Header as="h3" textAlign="center">
    Enrollment
    <Link to="/"> Home</Link>
  </Header>
);

export default Enrollment;