import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import CourseForm from './CourseForm';
import { List, Header, Segment, Button, Icon } from "semantic-ui-react";
import { AuthContext } from "../providers/AuthProvider";


const Course = (props) => {
  const [lessons, setLessons] = useState([]);
  const [course, setCourse] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const {user } = useContext(AuthContext)

  useEffect(() => {
    const course_id = props.match.params.id
    axios.get(`/api/courses/${course_id}/lessons`)
      .then(res => {
        // debugger
        // console.log(res.data)
        setLessons(res.data);
      })

    axios.get(`/api/courses/${course_id}`)
      .then(res => {
        setCourse(res.data);
      })

  }, [])
  const enroll = (id) =>{
    debugger
    axios.post(`/api/my-courses/${id}`, {user_id: user.id})
    // setEnrollments()
  }

  const renderLessons = () => {
    return lessons.map(lesson => (
      <Segment key={lesson.id} style={{display:"flex", justifyContent: "space-between"}}>
        <div>
        <List.Header as="h3">{lesson.name}</List.Header>
        <List.Description>
          {lesson.description}
        </List.Description>
        </div>
      
      </Segment>
    ))
  }

  const courseEdit = (data) => {
    setCourse(data)
  }

  const toggleForm = () => {
    setShowForm(false)
  }

  return (
    <>
      <Header as="h1">{course.title}</Header>
      {user ? <Button icon onClick={()=>enroll(course.id)} color = "green inverted"><Icon name="add circle"/></Button> : null}
   
      <br />
      {showForm ? <CourseForm id={props.match.params.id} edit={courseEdit} toggleForm={toggleForm} course={course} /> : null}

      <Button onClick={() => setShowForm(!showForm)}>
        {showForm ? "Close Form" : "Edit Course"}
      </Button>
      <br />
      <List>
        {renderLessons()}
      </List>
    </>
  )
}

export default Course;











