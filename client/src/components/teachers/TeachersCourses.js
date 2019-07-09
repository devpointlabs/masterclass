import React, {useEffect, useContext} from "react";
import { Header, Card, Container, Button, Icon, Divider, Segment} from "semantic-ui-react";
import { Link, } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../../providers/AuthProvider";

const TeachersCourses = (props) => {
  const {user, enrollments, setEnrollments } = useContext(AuthContext)
  // axios call to get enrollments
  useEffect(()=>{
    axios.get("/api/my-courses")
      .then(res => {
        setEnrollments(res.data)
      })
  },[])

  const removeCourse = (id) => {
    axios.delete(`/api/my-courses/${id}`)
    .then(res => {
        setEnrollments(enrollments.filter(e => e.course_id !== id))
    })

  }
  
  const renderEnrollments = () =>{
    let roles = []
    enrollments.map(e=>{
      if (e.role === 'teacher'){
        roles.push(e)
      }
    })
    return roles.map(e =>(
      <div key = {e.course_id}>
        <Header as = 'h1'>{e.role}</Header>
        <Card>
          <Link to={{pathname: `/courses/${e.course_id}`}}>
        <Card.Header as ='h2'>{e.title}</Card.Header>
          <Card.Description>{e.overview || "This will have an overview"}</Card.Description>
          </Link>
          <Divider />
          <Card.Meta>
         { (e.role ==='teacher') && <Button size="tiny" color="red" icon animated onClick={() => removeCourse(e.course_id)}>
            <Button.Content visible>Unenroll</Button.Content>
              <Button.Content hidden>
                <Icon name="minus" />
              </Button.Content>
            </Button>}
          </Card.Meta>
        </Card>
      </div>
    ))
  }

  
  return (
    <Container>
    <Card.Group itemsPerRow={3}>
    {enrollments ? 
    renderEnrollments() : 
    <>
    <Segment> 
    <h1>You have no courses</h1>
    </Segment>
    </>
  }
    </Card.Group>
    </Container>
  
  )

};

export default TeachersCourses;