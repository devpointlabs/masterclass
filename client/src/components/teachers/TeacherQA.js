import React, { useState, useEffect, useContext, } from 'react';
import axios from 'axios';
import { AuthContext, } from '../../providers/AuthProvider';
import { Accordion, Container, Button } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import Video from '../Video'
// import { Accordion, AccordionItem, AccordionItemHeading,
//   AccordionItemPanel,
// } from 'react-accessible-accordion';

const TeacherQA = (props) =>{

  const [enrollments, setEnrollments] = useState([])
  const [myQAs, setMyQAs]= useState([])
  const [render, setRender]= useState(false)
  const [userInfo, setUserInfo] = useState([])

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
    if(id === v.video_id && complete=== false){
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
  let complete = false
  return lessons.map(l =>{
    if(id === l.lesson_id && complete ===false){
      complete = true
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
  return (
    <>
    <div style={{display: 'flex', justifyContent:"space-evenly"}}>
    <Accordion defaultActiveIndex={0} panels={rootPanels} styled />
    <div>
    <h1>Comments</h1>
      {comments.map(c=>{
        return (
          <h4>{c.id}. {c.body}</h4>
        )
      })}
    </div>
  
    </div>
  </>
  )


}

export default TeacherQA