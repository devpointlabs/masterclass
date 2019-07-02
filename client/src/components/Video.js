import React, { useState, useEffect, } from 'react';
import axios from 'axios';
import Comments from "./Comments";
import { Segment, Header, Image, } from 'semantic-ui-react';

const Video = (props) => {
  const [video, setVideo] = useState([])

  useEffect( () => {
    const lesson_id = props.match.params.id
    const video_id = props.match.params.video_id
    axios.get(`/api/lessons/${lesson_id}/videos/${video_id}`)
      .then( res => setVideo(res.data))
  }, [])

  return(
    <>
      <Segment>
        <Header as="h1" textAlign="center">{video.title}</Header>
        <Image
          centered
          src={video.url}
          alt="video"
        />
        <p>{video.description}</p>
      </Segment>
      <Segment>
        <Comments {...props}/>
      </Segment>
    </>
  )
};

export default Video;