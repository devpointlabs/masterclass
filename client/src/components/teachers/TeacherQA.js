import React, { useState, useEffect, useContext, } from 'react';
import axios from 'axios';
import { AuthContext, } from '../../providers/AuthProvider';
import styled from 'styled-components';
import { Accordion, Menu, Segment, Sidebar, Button, Icon, Comment, Checkbox,  } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import Replies from '../Replies'


const TeacherQA = (props) =>{
  const [showReplies, setShowReplies] = useState(false)
  const [enrollments, setEnrollments] = useState([])
  const [myQAs, setMyQAs]= useState([])
  const [showForm, setShowForm] = useState(false)
  const [visible, setVisible] = useState(false);
  const [comments, setComments] = useState([])
  
  
  const handleHideClick = () => setVisible(false); 
  const handleShowClick = () => setVisible(true); 
  const handleSidebarHide = () => setVisible(false);
  


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
    let videoObject = {key: v.video_id, content: 
      <>
        <br/>
        <Accordion.Content style={{display: "flex", justifyContent: "center", alignItems: "center", margin: "0px", paddingTop: "0px", width: "50vw"}}>
          <Button color="violet" style={{width: "30%", display: "flex", justifyContent: "center", alignItems: "center"}} onClick={() => fillComments(v.video_id)}>
          {v.video_title}
          </Button>
        </Accordion.Content>
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
      <Accordion.Title style={{color: "white", paddingLeft: "40px", fontSize: "15px", border: "#707070 solid 3px", boxShadow: "5px 8px 8px rgba(36, 36, 36, 0.77)", marginBottom: "10px"}}>
        <Icon name="dropdown" color="violet" />
        {c.lesson_name}
      </Accordion.Title>
       , 
       content: { content: 
        <AccordionContent style={{display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", boxShadow: "5px 8px 8px rgba(36, 36, 36, 0.77)", padding: "0px", color: "white", textDecoration: "underline", fontWeight: "bold", width: "50vw"}}>
          Video Selection
          {videoContent(c.video_id)}
        </AccordionContent>
      } }
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
        <Accordion.Title style={{color: "white", paddingLeft: "20px", fontSize: "20px",   background: "#606060", border: "#707070 solid 3px", marginBottom: "15px", boxShadow: "5px 8px 8px rgba(36, 36, 36, 0.77)"}}>
          <Icon name="dropdown" color="violet" />
          {c.c_title}
        </Accordion.Title>
       , 
       content: { content:
        <>
          <AccordionContent style={{ boxShadow: "5px 8px 8px rgba(36, 36, 36, 0.77)", padding:   "0px", color: "white", textDecoration: "underline", fontWeight: "bold"}}>
            <div style={{display: "flex", justifyContent: "center", fontSize: "20px"}}>
              Lesson Selection
            </div>
            {lessonContent(c.lesson_id)}
          </AccordionContent>
          <br/>
        </>
      } }
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
      <Accordion.Title style={{color: "white" , fontSize: "25px", background: "#404040", border: "#707070 solid 3px",boxShadow: "5px 8px 8px rgba(36, 36, 36, 0.77)"}}>
        <Icon name="dropdown" color="violet" />
        Unread Questions In These Courses
      </Accordion.Title>
      , 
      content: {content:
          <AccordionContent style={{boxShadow: "5px 8px 8px rgba(36, 36, 36, 0.77)", color:    "white", textDecoration: "underline", fontWeight: "bold", width: "100%"}}>
            {CourseContent}
          </AccordionContent>
      }
    }
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
            <CommentContent as="h3" style={{display: "flex", justifyContent: "space-between",color: "white", marginLeft: "5px", marginTop: "5px"}}>
              {c.title}
              <Comment.Action style={{marginRight: "12px"}}>
                {renderButtons(c.read, c.id)}
              </Comment.Action>
            </CommentContent>
            <CommentContent style={{color: "white", marginLeft: "12px"}}>
              {c.body}
            </CommentContent>
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
    <Button.Group>
          <Button disabled={visible} onMouseOver={handleShowClick}>
            Show sidebar
          </Button>
          <Button disabled={!visible} onMouseOver={handleHideClick}>
            Hide sidebar
          </Button>
        </Button.Group>
        <Sidebar.Pushable as={Segment}>
          <Sidebar
            as={Menu}
            animation='overlay'
            icon='labeled'
            inverted
            onHide={handleSidebarHide}
            vertical
            visible={visible}
            width='thin'
            
          >
                <Link to="/teachers/courses">
            <Menu.Item as='a'>
              <Icon name='file video outline' />
              Courses
            </Menu.Item>
            </Link>
            <Link to="/teachers/QandA">
            <Menu.Item as='a'>
              <Icon name='comments outline' />
              Q&A
            </Menu.Item>
            </Link>
            <Link to="/forms/create">
                <Menu.Item as='a'>
                  <Icon name='plus square outline' />
                   New Course
                </Menu.Item>
            </Link>
          </Sidebar>
          <Segment basic>
          <Sidebar.Pusher>
          <div style={{display: 'flex', justifyContent: "space-between", background: "#808080", height: "100%"}}>
            <Accordion defaultActiveIndex={0} panels={rootPanels} style={{width: "50%", height: "100%", border: "#808080 solid 3px", boxShadow: "5px 8px 8px rgba(36, 36, 36, 0.77)"}}/>
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
          </Sidebar.Pusher>
          </Segment>
          </Sidebar.Pushable>
  </>
  )
}

const CommentContent = styled.div`
    position: relative;
    width: 100%;
    max-width: 100%;
    margin: 0px;
    overflow: hidden;
`;

const ClickDiv = styled.div`
  display: flex;
  justify-content: flex-end;
`
const AccordionContent = styled.div`
    position: relative;
    width: 100%;
    max-width: 100%;
    margin: 0px;
    overflow: hidden;
`;

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