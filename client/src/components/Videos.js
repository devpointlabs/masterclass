import React, { useState, useEffect, } from "react";
import axios from "axios";
import Comments from "./Comments";
import { Header, Image, List, Card, Segment, } from "semantic-ui-react";
import { Link, } from "react-router-dom";

const Videos = (props) => {
  const [comments, setComments] = useState([]);
  const [videos, setVideos] = useState([])

  useEffect( () => {
    const lesson_id = props.match.params.id
    axios.get(`/api/lessons/${lesson_id}/videos`)
      .then( res => setVideos(res.data) )
  }, [])

  return(
    <>
      {videos.map( video => (
        <Segment key={video.id}>
          <Header textAlign="center">{video.title}</Header>
          <Image
            centered
            src={video.url}
            alt="video"
            />
          <p>{video.description}</p>
          <Comments {...props}/>
        </Segment>
    ))}
    </>
  );
};

export default Videos;