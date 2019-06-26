import React, {useEffect, useState, useContext} from "react";
import { Header, Card, Container, Button, Icon} from "semantic-ui-react";
import { Link, } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../providers/AuthProvider";

const Enrollment = (props) => {
  const {user } = useContext(AuthContext)
  const [enrollments, setEnrollments] = useState([])

  // axios call to get enrollments
  useEffect(()=>{
    axios.get("/api/my-courses")
      .then(res => {
        setEnrollments(res.data)})
  },[])

  const removeCourse = (id) => {
    axios.delete(`/api/my-courses/${id}`)
    .then(res => {
      setEnrollments(enrollments.filter((course) => course.id !== id))
    })

  }
  
  const renderEnrollments = () =>{
    // const {id } = props.match.params
    {console.log(enrollments)}
    return enrollments.map(e =>(
      <div>
        <Card key= {e.id}>
          <Card.Content>
            <Card.Header>{e.title}</Card.Header>
          </Card.Content>
          <Card.Description>
          <Button size="tiny" color="red" icon animated onClick={() => removeCourse(e.course_id)}>
            <Button.Content visible>Unenroll</Button.Content>
              <Button.Content hidden>
                <Icon name="minus" />
              </Button.Content>
            </Button>
          </Card.Description>
        </Card>
      </div>
    ))
  }


  // will give a default role or user, if name is not able to be printed.
  const defaultRole = () => {
    if(enrollments.role === "student")
    return "student"
    else if(enrollments.role === "teacher")
    return "teacher"
    else 
    return "user"
  }
  
  return (
    <Container>

  <Header as="h3" textAlign="center">
    {user ? `Welcome, ${user.name || defaultRole() }, here are your current enrollments` : <Link to = "/">Home</Link> }
   
  </Header>
    <Card.Group itemsPerRow={3}>
    {renderEnrollments()}
    </Card.Group>
    </Container>
  
  )

};

export default Enrollment;