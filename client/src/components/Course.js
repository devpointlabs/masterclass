import React, { useState, useEffect, } from "react";
import axios from "axios";
import { List, Header, Segment, Button } from "semantic-ui-react";
import CourseForm from './CourseForm';

const Course = (props) => {
  const [lessons, setLessons] = useState([]);
  const [course, setCourse] = useState([]);
  const [showForm, setShowForm] = useState(false);

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

  const renderLessons = () => {
    return lessons.map(lesson => (
      <Segment key={lesson.id}>
        <List.Header as="h3">{lesson.name}</List.Header>
        <List.Description>
          {lesson.description}
        </List.Description>
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











