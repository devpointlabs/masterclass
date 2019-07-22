import React, { useState, useEffect, useContext, } from "react";
import axios from "axios";
import styled from 'styled-components';
import Showcase from './Images/stripe-background-course.png' 
import { List, Header, Segment, Button, Icon, Container, Image } from "semantic-ui-react";
import { Link } from 'react-router-dom'
import { AuthContext } from "../providers/AuthProvider"
import VideoView from "./view_pages/VideoView"


const Course = (props) => {
  const [lessons, setLessons] = useState([]);
  const [course, setCourse] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [enrolled, setEnrolled] = useState(true)
  const {user, enrollments, setEnrollments } = useContext(AuthContext)
  const [role, setRole] = useState("")
  const course_id = props.match.params.id

  useEffect(() => {
    window.scrollTo(0,0)
    axios.get(`/api/courses/${course_id}/lessons`)
    .then(res => {
      setLessons(res.data);
    })
    axios.get("/api/my-courses")
    .then(res => setEnrollments(res.data))
    
    axios.get(`/api/courses/${course_id}`)
    .then(res => {
      setCourse(res.data.course);
      setEnrolled(res.data.registered)
      setRole(res.data.role)
    })
   
  }, [enrolled])
    
    const enroll = (id) =>{
      axios.post(`/api/my-courses/${id}`, {user_id: user.id, role: "student"})
        .then(res =>{
          setEnrolled(true)
        })
    }
  
  const removeLesson = (id) => {
    axios.delete(`/api/courses/${props.match.params.id}/lessons/${id}`)
      .then(res => {
        setLessons(lessons.filter(l => l.id !== id))
      })

  }

  


  const renderLessons = () => {
    if (role == 'teacher') {
      return lessons.map(l => (
        
         <Segment key={l.id} style={{ display: "flex", justifyContent: "space-between" }}>
           <Link to = {`/lessons/${l.id}`}> 
         <List.Header as="h3">{l.name}</List.Header>
         <List.Description>
           {l.description}
         </List.Description>
           </Link>
         </Segment>
       
      ))}
       else if (role == 'student'){
         return lessons.map(l => (
        
          <Segment key={l.id} style={{ display: "flex", justifyContent: "space-between" }}>
          <div>
          <Link to = {`/lessons/${l.id}`}> 
         <List.Header as="h3">{l.name}</List.Header>
         <List.Description>
           {l.description}
         </List.Description>
           </Link>
          </div>
        </Segment>
         ))
       }
    else {
      return lessons.map(l => (
        
        <Segment key={l.id} style={{ display: "flex", justifyContent: "space-between" }}>
        <div>
          <List.Header as="h3">{l.name}</List.Header>
          <List.Description>
            {l.description}
          </List.Description>
        </div>
      </Segment>
      ))}
  }

  const courseEdit = (data) => {
    setCourse(data)
  }

  const toggleForm = () => {
    setShowForm(false)
  }
  const deleteCourse = () => {
    axios.delete(`/api/courses/${props.match.params.id}`)
      .then(res => {
        props.history.push("/")
      })
  }

  return (
    <> 
      <ShowcaseContainer style={{width: "100%", display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}> 
      
        <StyledCourseHeader>{course.title}</StyledCourseHeader>
        <StyledOverview>{course.overview}</StyledOverview>
       <br/>
       {/* this ternary is checking if enrolled is false and if user is true. Then it will display the button */}
       {(!enrolled && user) ? <Button icon onClick={()=>enroll(course.id)} color = "green"><Icon name="add circle"/>Enroll Now</Button>
       :
       <Link to={`/course-video-view/${course_id}`}>
       <Button color="purple">
         Start Learning
       </Button>
       </Link>
       }
       
        
      
      
      </ShowcaseContainer> 
      <div style = {{display: "flex", justifyContent: "space-between", padding: "15px"}}>
      <Header as="h1">Lesson Plan: {course.title}</Header>
      <Link to = {"/"}>
        <Button color='black'>
          <Icon name='arrow alternate circle left outline' />
          Go Back
          </Button>
        </Link>
        </div>   
      <br />
      <br/>
      <div style={{padding: "15px"}}>

      <List>
        {renderLessons()}
      </List>
      </div>
    </>
  )
}

const ShowcaseContainer = styled(Container)`
  display: flex;
  align-items: center; 
  justify-content: center;
  height: 80vh; 
  background-image: url(${Showcase}); 
  background-repeat: repeat; 
`

const StyledCourseHeader = styled(Header)`
  display: flex; 
  justify-content: center; 
  font-family: 'Halant', Arial, Helvetica, sans-serif !important; 
  letter-spacing: 3px; 
  font-size: 3rem !important; 
  font-weight: bold !important; 
  color: #fff !important; 

`
const StyledOverview = styled.p` 
  width: 50%; 
  font-family: 'Nunito Sans', Arial, Helvetica, sans-serif !important; 
  letter-spacing: 2px; 
  font-size: 1.3rem !important; 
  text-align: center; 
  /* font-weight: bold !important;  */
  color: #fff !important; 

`

export default Course;











