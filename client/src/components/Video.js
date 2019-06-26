import React, { useState, useEffect, } from "react";
import axios from "axios";
import { Header, Image, List, Card, Segment, } from "semantic-ui-react";
import { Link, } from "react-router-dom";

const Video = (props) => {
  const [videos, setVideos] = useState([])
  const [comments, setComments] = useState([])

  useEffect( () => {
    const video_id = props.match.params.id
    axios.get(`/api/videos/${video_id}`)
      .then( res => setVideos(res.data) )

    axios.get(`/api/videos/${video_id}/comments`)
      .then( res => setComments(res.data) )
  }, [])

  const renderVideos = () => {
    return videos.map( video => 
      <Segment key={video.id}>
        <Header textAlign="center">{video.title}</Header>
        <Image
          centered
          src={video.url}
          alt="video"
        />
        <p>{video.description}</p>
      </Segment>
      )
  }

  return(
    <>
      <Segment>
        {renderVideos()}
      </Segment>
      <List>
        <Card centered fluid>
          Comments
        </Card>
      </List>     
    </>
  );
};

export default Video;