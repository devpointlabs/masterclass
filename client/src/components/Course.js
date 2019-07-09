import React, { useState, useEffect, useContext, } from "react";
import axios from "axios";
import CourseForm from './CourseForm';
import { List, Header, Segment, Button, Icon } from "semantic-ui-react";
import { Link } from 'react-router-dom'
import { AuthContext } from "../providers/AuthProvider"


const Course = (props) => {
  const [lessons, setLessons] = useState([]);
  const [course, setCourse] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [enrolled, setEnrolled] = useState(true)
  const {user, enrollments, setEnrollments } = useContext(AuthContext)
  const [role, setRole] = useState("")

  useEffect(() => {

    const course_id = props.match.params.id
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
          // props.history.push("/")
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
         <div>
           <Link to = {`/lessons/${l.id}`}> 
         <List.Header as="h3">{l.name}</List.Header>
         <List.Description>
           {l.description}
         </List.Description>
           </Link>
         <Button size="tiny" color="red" onClick={() => removeLesson(l.id)}>
           <Icon name="trash alternate outline" />
         </Button>
         <Link to={`/edit_lesson/${l.id}`}> <Button size="tiny" color="blue">
           <Icon name="edit" />
         </Button>
         </Link>
       </div>
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
      <div style = {{display: "flex", justifyContent: "space-between"}}>
      <Header as="h1">{course.title}</Header>
      <Link to = {"/"}>
        <Button color='black'>
          <Icon name='arrow alternate circle left outline' />
          Go Back
          </Button>
        </Link>
        </div>   
      {/* this ternary is checking if enrolled is false and if user is true. Then it will display the button */}
      {(!enrolled && user) && <Button icon onClick={()=>enroll(course.id)} color = "green"><Icon name="add circle"/></Button>}
      <br />
      {(showForm && role =='teacher')&& <CourseForm id={props.match.params.id} edit={courseEdit} toggleForm={toggleForm} course={course} />}

     { (role == 'teacher') && <Button floated="right" color="green" onClick={() => setShowForm(!showForm)}>
        {showForm ? "Close Form" : "Edit Course"}
      </Button>}
      {(role == 'teacher') && <Button floated="right" color="red" onClick={deleteCourse}>Delete</Button>}
      <br />
      <List>
        {renderLessons()}
      </List>
    </>
  )
}

export default Course;











