import React, { useState, useEffect, useContext, } from 'react';
import axios from 'axios';
import { AuthContext, } from '../../providers/AuthProvider';
import styled from 'styled-components';
import { Accordion, Container, Button, Icon, Comment, Checkbox,  } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import Replies from '../Replies'


const TeacherQA = (props) =>{
  const [showReplies, setShowReplies] = useState(false)
  const [enrollments, setEnrollments] = useState([])
  const [myQAs, setMyQAs]= useState([])
  const [showForm, setShowForm] = useState(false)

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

  
    // -----------------Sanitize variables from duplicates --------------------

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
  // 
}
// ---------------------Rendering the various panels---------------------
const videoPanels = (id) =>{
  let array = []
  videos.map(v =>{
    let videoObject = {key: v.video_id, title: 
      <>
        <Accordion.Title style={{marginLeft: "30px"}}>
          <Button color="violet" fluid onClick={() => fillComments(v.video_id)}>
          {v.video_title}
          </Button>
        </Accordion.Title>
        <br/>
      </>
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
  return videos.map(v=>{
    if(id === v.video_id){
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
    let lessonObject = { key: c.lesson_id, title:
      <Accordion.Title style={{color: "white", marginLeft: "20px"}}>
        <hr/>
        <Icon name="dropdown" />
        {c.lesson_name}
        <hr/>
      </Accordion.Title>
       , 
       content: { content: videoContent(c.video_id)} }
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
    let courseObject = { key: c.c_id, title:
      <Accordion.Title style={{color: "white", marginLeft: "10px"}}>
      <hr/>
      <Icon name="dropdown" />
      {c.c_title}
      <hr/>
    </Accordion.Title>
       , 
       content: { content:lessonContent(c.lesson_id)} }
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
    {key: 1, title: 
      <Accordion.Title style={{color: "white"}}>
        <hr/>
        <Icon name="dropdown" />
        Courses List
        <hr/>
      </Accordion.Title>
      , 
      content: {content: CourseContent}}
  ]
  // --------------------------------------------------------------
  // ==============================================================

  // Functions for the Rendered Comments ----------------------

  const commentRead = (id) =>{
    axios.put(`/api/toggle-read/${id}`)

  }
  const toggleReplies = () => {
    setShowReplies(!showReplies)
  }
  const renderButtons = (read, id) =>{
    if(!read){
      return (
        <Checkbox label="Question Read" onClick={()=>commentRead(id)}/>
      )
    }
  }
  const showComments = () => {
    return (
      comments.map( c => (
        <>
        {!c.read ? (
          <>
          <div style={{ width: '100%', border: "#505050 solid 3px", borderRadius: "5px", background: "#707070", boxShadow: "5px 8px 8px rgba(36, 36, 36, 0.77)" }}>
          <Comment key={c.id}>
            <Comment.Content as="h3" style={{display: "flex", justifyContent: "space-between",color: "white", marginLeft: "5px", marginTop: "5px"}}>
              {c.title}
              <Comment.Action style={{marginRight: "12px"}}>
                {renderButtons(c.read, c.id)}
              </Comment.Action>
            </Comment.Content>
            <Comment.Content style={{color: "white", marginLeft: "12px"}}>
              {c.body}
            </Comment.Content>
            <ClickDiv>
          { showReplies ?
            <RepliesClick onClick={() => toggleReplies()}>Hide Replies <Icon name='angle up' /></RepliesClick>
            :
            <RepliesClick onClick={() => toggleReplies()}>Show Replies <Icon name='angle down' /></RepliesClick>
          }
        </ClickDiv>
        <Comment.Group style={{ width: "90%"}}>
          { showReplies ?
            <Replies 
              role={c.role}
              comment_id={c.id}
            /> :
            null
          }
        </Comment.Group>
        </Comment>
        </div>
        <br/>
        </>
        ): null}
      </>
      ))
    )
  }

  // ----------------------------------------------------------
  // ==========================================================

  // -----------------Main Return in the QA component-------------------
  return (
    <>
    <div style={{display: 'flex', justifyContent: "space-between", background: "#808080"}}>
      <Accordion defaultActiveIndex={0} panels={rootPanels} style={{width: "50%", height: "100vh", border: "#808080 solid 3px"}}/>
      <div style={{ display: "flex", flexDirection: "column", justifyContent: 'flex-start', width: "50%", background: "#5a5a5a", border: '#808080 solid 3px'}}>
        <h1 style={{ display: 'flex', justifyContent: 'center', paddingTop: '5px', borderBottom: '#5a5a5a solid 3px', margin: "0px", color: 'white'}}>Student Questions</h1>
          <>
            <div style= {{marginTop: '30px'}}>
                <div style={{display:'flex', justifyContent:'flex-start', padding: "15px"}}>
                  <Comment.Group style={{ width: "100vw"}}>
                  {showComments()}
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
const QAdiv = styled.div`
  height
`

export default TeacherQA