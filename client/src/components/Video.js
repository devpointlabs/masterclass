import React, { useState, useEffect, } from 'react';
import axios from 'axios';
import QAndAs from "./Comments";
import styled from 'styled-components';
import {Link } from "react-router-dom"
import { Player } from 'video-react';
import { Container,Button,  Icon, Header, Image, } from 'semantic-ui-react';

const Video = (props) => {
  const [video, setVideo] = useState([])
  const [role, setRole] = useState("")
  const [lesson, setLesson] = useState([])
  const [showQA, setShowQA] = useState(false)
  const course_id = lesson.course_id
  // const video_id = props.video_id
  // const lesson_id = props.lesson_id

  useEffect( () => {
    debugger
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
            {/* <Image src = {video.url}/> */}
            <Player
          playsInline
      // poster="/assets/poster.png"
              src={video.url}
            />
          </div>
        {/* <div className='video_des'>
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
        </div> */}
        <hr/>
        </div>
        <ClickDiv>
          { showQA ?
            <QAClick onClick={() => toggleQA()}>Hide QA's <Icon name='angle up' /></QAClick>
            :
            <QAClick onClick={() => toggleQA()}>Show QA's <Icon name='angle down' /></QAClick>
          }
        </ClickDiv>
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

const ClickDiv = styled.div`
  display: flex;
  justify-content: flex-end;
`

const QAClick = styled.p`
  color: blue;
  border-radius: 5px;
  padding-left: 7px;

  &:hover {
    cursor: pointer;
    background: grey ;
    transition: background 0.7s ease;
  } 
`

export default Video;