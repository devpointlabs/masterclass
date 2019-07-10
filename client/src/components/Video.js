import React, { useState, useEffect, } from 'react';
import axios from 'axios';
import QAndAs from "./Comments";
import {Link } from "react-router-dom"
import { Container,Button,  Icon, Header, Image, } from 'semantic-ui-react';

const Video = (props) => {
  const [video, setVideo] = useState([])
  const [role, setRole] = useState("")
  const [lesson, setLesson] = useState([])
  const [showQA, setShowQA] = useState(false)
  const course_id = lesson.course_id

  useEffect( () => {
    const lesson_id = props.match.params.lesson_id
    const video_id = props.match.params.video_id
    axios.get(`/api/lessons/${lesson_id}/videos/${video_id}`)
      .then( res => setVideo(res.data))
    axios.get(`/api/lessons/${lesson_id}`)
      .then(res=> setLesson(res.data))

    }, [])
    useEffect( ()=>{
      axios.get(`/api/courses/${course_id}`)
      .then(res => {
        setRole(res.data.role)
      })
  },[lesson])

  const toggleQA = () => {
    setShowQA(!showQA)
  }

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
        <Link to = {`/lessons/${lesson.id}`}>
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
          {role === 'teacher' && 
          <Link to={`/lessons/${id}/videos/${video.id}/edit`}>
            <Button inverted color="blue">
              <Icon name='pencil' />
              Update Item
            </Button>
          </Link>}
          { role === 'teacher' && 
          <Button inverted color='red' onClick={handleDelete}>
            <Icon name='trash' />
            Delete Item
          </Button>}
        </div>
        <hr/>
        </div>
        <div style={clickDiv}>
          { showQA ?
            <p style={QAClick} onClick={() => toggleQA()}>Hide QA's <Icon name='angle up' /></p>
            :
            <p style={QAClick} onClick={() => toggleQA()}>Show QA's <Icon name='angle down' /></p>
          }
        </div>
        <div>
          { showQA ?
            <QAndAs 
              video_id = {props.match.params.video_id} 
              role = {role}
            /> :
            null
          }
        </div>
      </Container>
    </>
  )
};

const clickDiv = {
  display: "flex",
  justifyContent: "flex-end",
};

const QAClick = {
  color: "blue", 
};

export default Video;