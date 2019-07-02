import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import Comments from "./Comments";
import {Link } from "react-router-dom"
import { Container,Button,  Icon, Header, Image, } from 'semantic-ui-react';

const Video = (props) => {
  const [video, setVideo] = useState([])
  const video_id = props.match.params.video_id

  useEffect( () => {
    const lesson_id = props.match.params.lesson_id
    const video_id = props.match.params.video_id
    axios.get(`/api/lessons/${lesson_id}/videos/${video_id}`)
      .then( res => setVideo(res.data))
  }, [])

  const handleDelete = () => {
    const lesson_id = props.match.params.id
    const video_id = props.match.params.video_id
    axios.delete(`/api/lessons/${lesson_id}/items/${video_id}`)
      .then(res => {
        this.props.history.push(`/lessons/${lesson_id}`)
      })
  }
  const {id } = props.match.params.video_id
  
  return(
    <>
     <Container style ={{marginBottom: '40px'}}>
       <Link to = {`/lessons/${id}`}>
       <Button color='black'>
            <Icon name='arrow alternate circle left outline' />
            Go Back
            </Button>
       </Link>
       <div className='item_view'>
        <div className='item_card'>
          <Header as='h1'>{video.title}</Header>
          <Image src = {video.url}/>
          </div>
          <div className='video_des'>
          <Link to={`/lessons/${id}/videos/${video.id}/edit`}>
          <Button inverted color="blue">
            <Icon name='pencil' />
            Update Item
            </Button>
        </Link>
        <Button inverted color='red' onClick={handleDelete}>
          <Icon name='trash' />
          Delete Item
        </Button>

          </div>
        </div>
        <Comments video_id = {props.match.params.video_id}/>
     </Container>
    </>
  )
};

export default Video;