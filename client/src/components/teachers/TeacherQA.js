import React, { useState, useEffect, useContext, } from 'react';
import axios from 'axios';
import { AuthContext, } from '../../providers/AuthProvider';
import styled from 'styled-components';
import { Accordion, Container, Button, Icon, Comment, Checkbox,  } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import Video from '../Video'
import QAndA from '../Comment'
import CommentForm from '../CommentForm'
import Replies from '../Replies'
// import { Accordion, AccordionItem, AccordionItemHeading,
//   AccordionItemPanel,
// } from 'react-accessible-accordion';

const TeacherQA = (props) =>{
  const [showReplies, setShowReplies] = useState(false)
  const [enrollments, setEnrollments] = useState([])
  const [myQAs, setMyQAs]= useState([])
  const [render, setRender]= useState(false)
  const [userInfo, setUserInfo] = useState([])
  const [showForm, setShowForm] = useState(false)
  const [readComment, setReadComment]= useState(false)

  const [comments, setComments] = useState([])

  useEffect(()=>{
    axios.get('/api/my-courses')
    .then(res =>{
      setEnrollments(res.data)
    })
  },[])
  
  useEffect(() => {
    axios.get("/api/teacher-courses")
      .then(res => {
        setMyQAs(res.data)
      })
    }, [enrollments])
    const toggle = () =>{
      setShowForm(!showForm)
    }
    const deleteComment = (c_id) =>{
      axios.delete(`/api/videos/${props.video_id}/comments/${c_id}`)
      .then(res =>{
        setComments(comments.filter(c => c.id !== c_id))
        })
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
    const addComment = (comment) =>{
      setComments([...comments, comment])
    }
  const courses = Array.from(new Set(myQAs.map(c =>c.c_title))).map(title=>{
    return myQAs.find(c => c.c_title === title)
  })
  const lessons = Array.from(new Set(myQAs.map(l => l.lesson_name))).map(name=>{
    return myQAs.find(l => l.lesson_name === name)
  })
  const videos = Array.from(new Set(myQAs.map(v =>v.video_title))).map(title=>{
    return myQAs.find(v => v.video_title === title)
  })

const fillComments = (id) =>{
  axios.get(`/api/videos/${id}/comments`)
  .then(res => setComments(res.data))
  const stuffRead = comments.map(c =>{
    return {
      title: c.title,
      video_id: c.video_id,
      readComment: false,
      body: c.body
    }
  })
}

const videoPanels = (id) =>{
  let array = []
  videos.map(v =>{
    let videoObject = {key: v.video_id, title: 
      <Accordion.Title as={Container}>
        <Button onClick={()=>fillComments(v.video_id)}>
        {v.video_title}
        </Button>
      </Accordion.Title>
    }
    if (id === v.v_lesson_id)
    {
      array.push(videoObject)
    }
  })
  return (
    array
  )
}
const videoContent = (id) =>{
  let complete = false
  return videos.map(v=>{
    if(id === v.video_id){
      complete = true 
      return(
        <div>
          <Accordion.Accordion panels = {videoPanels(v.v_lesson_id)}/>
        </div>
      
            )
    }
  })
}
const lessonPanels = (id) =>{
  let array = []
  lessons.map(c =>{
    let lessonObject = { key: c.lesson_id, title: c.lesson_name, content: { content: videoContent(c.video_id)} }
    if (id === c.l_course_id){
    array.push(lessonObject)}
  })
  return(
    array
  )
}
const lessonContent=(id)=>{
  return lessons.map(l =>{
    if(id === l.lesson_id){
      return(
  <div>
    <Accordion.Accordion panels = {lessonPanels(l.l_course_id)}/>
  </div>

      )
    }
  })
}
const coursePanels = () =>{
  let array = []
  courses.map(c =>{
    let courseObject = { key: c.c_id, title: c.c_title, content: { content:lessonContent(c.lesson_id)} }
    array.push(courseObject)
  })
  return(
    array
  )
}
  
  
  const CourseContent =(
    <div>
      <Accordion.Accordion panels = {coursePanels()}/>

    </div>
  )
  const rootPanels = [
    {key: 1, title: 'Courses', content: {content: CourseContent}}
  ]
  const commentRead = (id) =>{
    axios.put(`/api/toggle-read/${id}`)

  }
  const toggleReplies = () => {
    setShowReplies(!showReplies)
  }
  const renderButtons = (read, id) =>{
    if(!read){
      return (
        <Checkbox label="Comment Read" onClick={()=>commentRead(id)}/>
      )
    }
  }
  const showComments = () => {
    return (
      
      comments.map( c => (
        <>
        {!c.read ? (
          <Comment key={c.id}>
            <Comment.Content>
              {c.title}
            </Comment.Content>
            <Comment.Content>
              {c.body}
            </Comment.Content>
            <Comment.Action>
              {renderButtons(c.read, c.id)}
            </Comment.Action>
            <ClickDiv>
          { showReplies ?
            <RepliesClick onClick={() => toggleReplies()}>Hide Replies <Icon name='angle up' /></RepliesClick>
            :
            <RepliesClick onClick={() => toggleReplies()}>Show Replies <Icon name='angle down' /></RepliesClick>
          }
        </ClickDiv>
        <Comment.Group>
          { showReplies ?
            <Replies 
              role={c.role}
              comment_id={c.id}
            /> :
            null
          }
        </Comment.Group>
        </Comment>
        ): null}
     
      </>
      ))
    )
  }
  return (
    <>
    <div style={{display: 'flex', justifyContent:"space-evenly"}}>
    <Accordion defaultActiveIndex={0} panels={rootPanels} styled />
    <div>
    <h1>Student Questions</h1>
      <>
      <div style= {{marginTop: '30px'}}>
        <hr/>
     
        <div style={{display:'flex', justifyContent:'flex-start', marginTop:'30px'}}>
          <Comment.Group>
            {showComments()}
            {console.log(comments)}
          </Comment.Group>
        </div>
      </div>
    </>
    </div>
  
    </div>
  </>
  )


}
const ClickDiv = styled.div`
  display: flex;
  justify-content: flex-end;
`

const RepliesClick = styled.p`
  color: blue;
  border-radius: 5px;
  padding-left: 7px;

  &:hover {
    cursor: pointer;
    background: grey ;
    transition: background 0.7s ease;
  } 
`

export default TeacherQA