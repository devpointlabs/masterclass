import React, { useState, useEffect, useContext, } from "react";
import axios from "axios";
import styled from 'styled-components';
import Showcase from './Images/stripe-background-course.png' 
import { List, Header, Segment, Button, Icon, Container, Image, Accordion, Breadcrumb } from "semantic-ui-react";
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
  const [activeIndex, setActiveIndex] = useState(0)
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

  const handleClick = (i) => {
    const newIndex = activeIndex === i ? -1 : i
    setActiveIndex(newIndex)
  }

  


  const renderLessons = () => {
    // if (role == 'teacher') {
    //   return lessons.map(l => (
        
    //      <Segment key={l.id} style={{ display: "flex", justifyContent: "space-between" }}>
    //        <Link to = {`/lessons/${l.id}`}> 
    //      <List.Header as="h3">{l.name}</List.Header>
    //      <List.Description>
    //        {l.description}
    //      </List.Description>
    //        </Link>
    //      </Segment>
       
    //   ))}
    //    else if (role == 'student'){
    //      return lessons.map(l => (
        
    //       <Segment key={l.id} style={{ display: "flex", justifyContent: "space-between" }}>
    //       <div>
    //       <Link to = {`/lessons/${l.id}`}> 
    //      <List.Header as="h3">{l.name}</List.Header>
    //      <List.Description>
    //        {l.description}
    //      </List.Description>
    //        </Link>
    //       </div>
    //     </Segment>
    //      ))
    //    }
    // else {
        let lessonsArray = []
        let lessonsArray2 = []
        lessons.map(l => {
          let lesson = { 
            key: l.id,
            content:
              <>
                <Accordion.Title 
                style={{ color: '#fff', fontSize: '1.5rem', fontFamily: "'Nunito Sans'"}} 
                active={activeIndex === l.id} 
                index={l.id} onClick={() => handleClick(l.id)}
                >
                  {/* <hr/> */}
                  <Icon name="dropdown" />
                  {l.name}
                  {console.log(l.name)}
                  <hr style={{borderColor: "#8E2DE2"}}/>
                </Accordion.Title>
                <Accordion.Content active={activeIndex === l.id} style={{color: "#fff"}}>
                  <StyledHeader>Description:</StyledHeader>
                  <StyledParagraph>{l.description}</StyledParagraph>
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
      // }
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
      <BreadCrumbDiv>
      <Breadcrumb size="large">
      <Breadcrumb.Section link onClick={() => props.history.push("/")} style={{color: "#fff"}}>Courses</Breadcrumb.Section>
      <Breadcrumb.Divider icon='right chevron' />
      <Breadcrumb.Section>{course.category}</Breadcrumb.Section>
      <Breadcrumb.Divider icon='right chevron' />
      <Breadcrumb.Section active style={styles.active}>{course.title}</Breadcrumb.Section>
      </Breadcrumb>
      </BreadCrumbDiv>
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
       {/* <Link to = {"/"}>
        <Button color='black'>
          <Icon name='arrow alternate circle left outline' />
          Go Back
          </Button>
        </Link> */}
       </Link>
       }
       
        
      
      
      </ShowcaseContainer> 
      <LessonDiv>
        
        <StyledAccordion >
          <h1 style={LessonStyles}>
            Lesson Plan
          </h1>
          {renderLessons()}
        </StyledAccordion>  
      </LessonDiv>
    </>
  )
}

const styles = {
  active: {
    color: '#8E2DE2',
    // borderBottom: ' #8E2DE2 3px solid',
    fontWeight: 'bold',
  }
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

const LessonDiv = styled.div`
  background: #1A1A1A; 
  padding: 15px; 
  height: 100%;
   min-height: calc(100vh - 90px);
   width: 100%;
   display: flex;
   flex-direction: column;
   justify-content: center;  
   align-items: center; 
`
const LessonStyles = {
  color: "#fff",
  fontFamily: "'Halant', Arial, Helvetica, sans-serif",
  display: 'flex', 
  justifyContent: 'flex-start', 
  marginTop: '17px'
}
const StyledAccordion = styled(Accordion)`
  height: 100%; 
  width: 50% !important; 
`;

const StyledHeader = styled.h3`
  /* color: #8E2DE2 !important; */
  text-decoration: underline; 
`

const StyledParagraph = styled.p`
  font-size: 1.3rem; 
  font-family: 'Merriweather', Arial, Helvetica, sans-serif;
  padding-left: 15px;  
`

const BreadCrumbDiv = styled.div`
  background: #323232; 
  height: 30px; 
  /* padding: 10px;  */
  color: #fff; 
`


export default Course;











