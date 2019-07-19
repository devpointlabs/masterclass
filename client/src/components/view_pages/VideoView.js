import React, { useState, useEffect, useContext, } from 'react';
import axios from 'axios';
import QAndA from "../Comment";
import CommentForm from "../CommentForm";
import {AuthContext} from '../../providers/AuthProvider'
import { Accordion, Icon, Button, Header, Comment, } from 'semantic-ui-react';
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
              <Button fluid onClick={()=> renderVideo(v.lesson_id, v.video_id)}>
                {v.video_title}
              </Button>
            </AccordionContent>
            <hr/>
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
      <Comment key={c.id}>
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
            <Accordion.Title active={activeIndex === l.lesson_id} index={l.lesson_id} onClick={() => handleClick      (l.lesson_id)}>
              <Icon name="dropdown" />
              {l.lesson_name}
              <hr/>
            </Accordion.Title>
            <Accordion.Content active={activeIndex === l.lesson_id}>
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
          <>
            <Header as='h1'>{video.title}</Header>
            {/* <Image src = {video.url}/> */}
            <Player
              playsInline
              // poster="/assets/poster.png"
              src={video.url}
            />
          </>
        ):null}
        <ClickDiv>
          { showQA ?
            <QAClick onClick={() => toggleQA()}>Hide QA's <Icon name='angle up' /></QAClick>
            :
            <QAClick onClick={() => toggleQA()}>Show QA's <Icon name='angle down' /></QAClick>
          }
        </ClickDiv>
        <div style={{width: '95%', border: 'solid 3px purple', borderRadius: '5px'}}>
          { showQA ?
            <>
            <div style={{marginTop: '30px'}}>
              <hr/>
              <h1>Q and A</h1>
              <Button color='teal' onClick={toggle}>
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
                <Comment.Group>
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
        <Accordion styled>
          {renderLessons()}
        </Accordion>
      </LessonsDrop>
    </VideoViewDiv>
  )
};

const ClickDiv = styled.div`
  display: flex;
  justify-content: center;
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

const VideoViewDiv = styled.div`
  display: flex;
  flex-direction: row;
  align-items: top;
  justify-content: center;
  width: 100vw;
  height: 100%;
  min-height: 100vh;
`

const VidAndQA = styled.div`
  width: 75%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
`

const LessonsDrop = styled.div`
  width: 25%;
  display: flex;
  height: 100vh;
  flex-direction: column;
  align-content: top;
  min-height: 100vh;
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