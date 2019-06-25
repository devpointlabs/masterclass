import React from "react";
import axios from "axios";
import { Header, } from "semantic-ui-react";
import { Link, } from "react-router-dom";

const Video = (props) => {
  

  return(
  <Header as="h3" textAlign="center">
    Video
    <Link to="/"> Home</Link>
  </Header>
  );
};

export default Video;