import React, { useState, useEffect, useContext, useReducer } from "react";
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
    })
  }, [])
    
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
    if (user) {
    return lessons.map(l => (
      <Segment key={l.id} style={{ display: "flex", justifyContent: "space-between" }}>
          <div>
          <List.Header as="h3">{l.name}</List.Header>
          <List.Description>
            {l.description}
          </List.Description>
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
      
      <Header as="h1">{course.title}</Header>
      {/* this ternary is checking if enrolled is false and if user is true. Then it will display the button */}
      {console.log(enrollments)}
      {(!enrolled && user) && <Button icon onClick={()=>enroll(course.id)} color = "green inverted"><Icon name="add circle"/></Button>}
      <br />
      {(showForm && user)&& <CourseForm id={props.match.params.id} edit={courseEdit} toggleForm={toggleForm} course={course} />}

     { user && <Button floated="right" color="green" onClick={() => setShowForm(!showForm)}>
        {showForm ? "Close Form" : "Edit Course"}
      </Button>}
      {user && <Button floated="right" color="red" onClick={deleteCourse}>Delete</Button>}
      <br />
      <List>
        {renderLessons()}
      </List>
    </>
  )
}

export default Course;











