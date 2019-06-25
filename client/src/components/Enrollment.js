import React, {useEffect, useState, useContext} from "react";
import { Header, Card, Container} from "semantic-ui-react";
import { Link, } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../providers/AuthProvider";

const Enrollment = () => {
  const {user } = useContext(AuthContext)
  const [enrollments, setEnrollments] = useState([])

  // axios call to get enrollments
  useEffect(()=>{
    axios.get("/api/my-courses")
      .then(res => {
        setEnrollments(res.data)})
  },[])
  
  const renderEnrollments = () =>{
    // const {id } = props.match.params
    return enrollments.map(e =>(
      <div>
        <Card key= {e.id}>
          <Card.Description>
            {e.title}
          </Card.Description>
        </Card>
      </div>
    ))
  }
  
  return (
    <Container>

  <Header as="h3" textAlign="center">
    Welcom {user.name} here are your current enrollments
    {renderEnrollments()}
  </Header>
  
  <Link to="/"> Home</Link>
    </Container>
  
  )

};

export default Enrollment;