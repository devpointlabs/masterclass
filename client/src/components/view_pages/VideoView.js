import React, { useState, useEffect, useContext, } from 'react';
import axios from 'axios';
import QAndA from "../Comment";
import CommentForm from "../CommentForm";
import StripeBackground from "../Images/StripeBackground.png";
import {AuthContext} from '../../providers/AuthProvider'
import { Accordion, Icon, Button, Header, Comment, Container } from 'semantic-ui-react';
import styled from 'styled-components';
import { Player } from 'video-react';



const VideoView = (props) => {
  const [videoViews, setVideoViews] = useState([]);
  const [video, setVideo] = useState([])
  const [comments, setComments] = useState([])
  const [showForm, setShowForm] = useState(false)
  const [activeIndex, setActiveIndex] = useState(0)
  const [showQA, setShowQA] = useState(false)
  const [role, setRole] = useState("")
  const { user, } = useContext(AuthContext)
  
  const id = props.match.params.id

  useEffect(() => {
    axios.get(`/api/course-video-view/${id}`)
      .then( res => setVideoViews(res.data) )
  }, [])

  useEffect( ()=>{
    axios.get(`/api/courses/${id}`)
    .then(res => {
      setRole(res.data.role)
    })
  },[])

  const handleClick = (i) => {
    const newIndex = activeIndex === i ? -1 : i
    setActiveIndex(newIndex)
  }

  const renderVideo = (l_id, v_id) => {
    axios.get(`/api/lessons/${l_id}/videos/${v_id}`)
    .then( res => setVideo(res.data))
    axios.get(`/api/videos/${v_id}/comments`)
    .then( res => setComments(res.data))
  }

  const toggleQA = () => {
    setShowQA(!showQA)
  }

  const toggle = () =>{
    setShowForm(!showForm)
  }

  const addComment = (comment) =>{
    setComments([...comments, comment])
  }

  const editComment = (id, comment) => {
    const editedComment = comments.map(c => {
      if (c.id === id) {
        return comment
      } 
      else {
        return c
      }
    })
    return setComments(editedComment)
  }
  
  const deleteComment = (c_id) =>{
    axios.delete(`/api/videos/${video.id}/comments/${c_id}`)
    .then(res =>{
      setComments(comments.filter(c => c.id !== c_id))
      })
  }

  const renderVideos = (id) => {
    let videosArray = []
    let videosArray2 = []
    videoViews.map(v => {
      let video = {
        key: v.video_id,
        content:
          <>
            <AccordionContent>
              <Button color='violet' fluid onClick={()=> renderVideo(v.lesson_id, v.video_id)}>
                {v.video_title}
              </Button>
            </AccordionContent>
            <br/>
          </>
      }
      if(id === v.video_lesson_id) {
        if (videosArray.includes(video.key)===false) {
          {
            videosArray.push(video.key)
            videosArray2.push(video.content)
          }
        }
      }
    })
    return videosArray2
  }

  const showComments = () => {
    return (
      comments.map( c => (
      <Comment as={Container} fluid key={c.id}>
        <QAndA
          video_id={video.id}
          comment_id={c.id}
          comment_title={c.title}
          comment_body={c.body}
          comment_rating={c.rating}
          comment_read={c.read}
          delete_comment={deleteComment}
          edit_comment={editComment}
          showComments={showComments}
          user_id = {c.user_id}
          role = {props.role}
        />
      </Comment>
      ))
    )
  }

  const renderLessons = () => {
    let lessonsArray = []
    let lessonsArray2 = []
    videoViews.map(l => {
      let lesson = { 
        key: l.lesson_id,
        content:
          <>
            
            <Accordion.Title 
            style={{ color: 'white' }} 
            active={activeIndex === l.lesson_id} 
            index={l.lesson_id} onClick={() => handleClick(l.lesson_id)}
            >
            <hr/>
              <Icon name="dropdown" />
              {l.lesson_name}
              <hr/>
            </Accordion.Title>
            <Accordion.Content active={activeIndex === l.lesson_id}>
              <h4 style={{ color: 'white', display: 'flex', justifyContent: 'center', textDecoration: 'underline'}}>
                Video Selection
              </h4>
              {renderVideos(l.video_lesson_id)}
            </Accordion.Content>
          </>
      }
      if (lessonsArray.includes(lesson.key)===false) {
        {
          lessonsArray.push(lesson.key)
          lessonsArray2.push(lesson.content)
        }
      }
    })
    return lessonsArray2
  }

  return (
    <VideoViewDiv>
      <VidAndQA>
        {video ? (
          <div style={{ width: '90%' }}>
            <Header as='h1' style={{ color: 'white', marginTop: '5px'}}>{video.title}</Header>
            <Player
              playsInline
              src={video.url}
            />
          </div>
        ):null}
        <ClickDiv>
          { showQA ?
            <QAClick onClick={() => toggleQA()}>Hide QA's <Icon name='angle up' /></QAClick>
            :
            <QAClick onClick={() => toggleQA()}>Show QA's <Icon name='angle down' /></QAClick>
          }
        </ClickDiv>
        <div style={{width: '95%', border: 'solid 3px grey', borderRadius: '5px', padding: '15px', background: '#4f4f4f' }}>
          { showQA ?
            <>
            <div style={{marginTop: '30px'}}>
              <h1 style={{ color: 'white', borderBottom: 'white 1px solid'}}>
                Questions and Answers Section
              </h1>
              <Button color='violet' onClick={toggle}>
                <Icon name='comment alternate outline'/>
                Ask A Question
              </Button>
              { showForm ? 
                <CommentForm
                  showComments={showComments}
                  comments={comments}
                  setComments={setComments}
                  addComment={addComment}
                  video_id={video.id}
                  toggleForm={toggle}
                /> : 
                null
              }
              <div style={{display:'flex', justifyContent:'flex-start', marginTop:'30px'}}>
                <Comment.Group style={{ width: '100%', maxWidth: '100%'}}>
                  {showComments()}
                </Comment.Group>
              </div>
            </div>
          </> :
            null
          }
        </div>
      </VidAndQA>
      <LessonsDrop>
        <StyledAccordion>
          <h1 style={{ color: 'white', display: 'flex', justifyContent: 'center', marginTop: '17px'}}>
            Lesson Selection
          </h1>
          {renderLessons()}
        </StyledAccordion>
      </LessonsDrop>
    </VideoViewDiv>
  )
};

const ClickDiv = styled.div`
  display: flex;
  justify-content: center;
  margin: 5px;
`
const StyledAccordion = styled(Accordion)`
  height: 100%
`;

const QAClick = styled.p`
  color: #00e9ed;
  border-radius: 5px;
  padding-left: 7px;

  &:hover {
    cursor: pointer;
    background: grey ;
    transition: background 0.7s ease;
  } 
`

const VideoViewDiv = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  width: 100vw;
  height: 100%;
  min-height: 100vh;
  background: rgb(68,68,68);
  background: linear-gradient(90deg, rgba(68,68,68,1) 75%, rgba(134,134,134,1) 87%, rgba(68,68,68,1) 100%);
`

const VidAndQA = styled.div`
  width: 75%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  min-height: 100vh;
  background-image: url(${StripeBackground});
  background-repeat: repeat;
`

const LessonsDrop = styled.div`
  width: 25%;
  display: flex;
  flex-direction: column;
  align-content: top;
  border: grey solid 3px;
`;

const VideoButton = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-content: center;
  padding: 0px;
  margin: 5px;
`;

const AccordionContent = styled(Accordion.Content)`
  display: flex;
  padding: 0px;
  justify-content: center;
`;

export default VideoView