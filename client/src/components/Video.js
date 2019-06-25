import React, { useState, useEffect, } from "react";
import axios from "axios";
import { Header, Image, List, Card } from "semantic-ui-react";
import { Link, } from "react-router-dom";

const Video = (props) => {
  const [video, setVideo] = useState([])

  useEffect( (id) => {
    axios.get(`/api/videos/${id}`)
      .then( res => setVideo(res.data))
  }, [])

  return(
    <>
      <Header textAlign="center">
        Video Title
      </Header>
      <Image
        centered
        src=""
        alt="video"
      />
      <List>
        <Card centered fluid>
          Comments
        </Card>
      </List>
    </>
  );
};

export default Video;