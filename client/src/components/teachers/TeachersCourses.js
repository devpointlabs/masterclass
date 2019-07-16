import React, { useState, useEffect, useContext } from "react";
import { Header, Card, Container, Button, Icon, Divider, Segment } from "semantic-ui-react";
import { Link, } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../../providers/AuthProvider";

const TeachersCourses = (props) => {
  const { user, enrollments, setEnrollments } = useContext(AuthContext);
  const [courses, setCourses] = useState();
  // axios call to get enrollments
  useEffect(() => {
    axios.get("/api/my-courses")
      .then(res => {
        setEnrollments(res.data)
      })
  }, [])

  const removeCourse = (id) => {
    axios.delete(`/api/my-courses/${id}`)
      .then(res => {
        setEnrollments(enrollments.filter(e => e.course_id !== id))
      })
  }


  const renderEnrollments = () => {
    let roles = []
    enrollments.map(e => {
      if (e.role === 'teacher') {
        roles.push(e)
      }
    })

    return (roles.map(e => (
      <div key={e.course_id}>
        {/* <Header as = 'h1'>{e.role}</Header> */}
        <br />
        <h1>{e.category}</h1>
        <Card fluid>
          <Link to={{ pathname: `/courses/${e.course_id}` }}>
            <Card.Header as='h2'>{e.title}</Card.Header>
            <Card.Description>{e.overview || "This will have an overview"}</Card.Description>
          </Link>
          <Divider />
          <Card.Meta>
            {/* TODO - Delete Button & Edit Button */}
            <div style={{display:"flex", justifyContent:"flex-end" }}>
            {(e.role === 'teacher') &&
              <Link to={`/courses/${e.course_id}/manage`}>
                <Button size="tiny" color="blue" icon animated>
                  <Button.Content visible>Edit</Button.Content>
                  <Button.Content hidden>
                    <Icon name="pencil" />
                  </Button.Content>
                </Button>
              </Link>}
            {(e.role === 'teacher') && <Button size="tiny" color="red" icon animated onClick={() => removeCourse(e.course_id)}>
              <Button.Content visible>Delete</Button.Content>
              <Button.Content hidden>
                <Icon name="minus" />
              </Button.Content>
            </Button>}
         </div>
          </Card.Meta>
        </Card>
      </div>
    ))
    )
  }


  return (
    <Container>
      <div style={{ display: "flex", flexDirection: "column", }}>

        {enrollments ?
          renderEnrollments() :
          <>
            <Segment>
              <h1>You have no courses</h1>
            </Segment>
          </>
        }
      </div>
    </Container>

  )

};

export default TeachersCourses;