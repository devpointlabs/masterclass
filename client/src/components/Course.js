import React, { useState, useEffect, } from "react";
import axios from "axios";
import { List, Header, Segment, } from "semantic-ui-react";

const Course = (props) => {
  const [lessons, setLessons] = useState([]);
  const [course, setCourse] = useState([]);

  useEffect(() => {
    const course_id = props.match.params.id
    axios.get(`/api/courses/${course_id}/lessons`)
      .then(res => {
        debugger
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

  return (
    <>
      <Header as="h1">{course.title}</Header>
      <br />
      <List>
        {renderLessons()}
      </List>
    </>
  )
}

export default Course;











