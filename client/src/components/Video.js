import React from "react";
import { Header, } from "semantic-ui-react";
import { Link, } from "react-router-dom";

const Video = () => (
  <Header as="h3" textAlign="center">
    Video
    <Link to="/"> Home</Link>
  </Header>
);

export default Video;