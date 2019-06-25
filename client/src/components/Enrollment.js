import React, {useEffect, useState, useContext} from "react";
import { Header, } from "semantic-ui-react";
import { Link, } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../providers/AuthProvider";

const Enrollment = () => {
  const {user } = useContext(AuthContext)
  const [enrollments, setEnrollments] = useState([])

  // axios call to get enrollments
  useEffect(()=>{
    axios.get("/api/my-courses", user.id)
      .then(res => setEnrollments(res.data))
  },[])
  console.log(enrollments)
  
  
  return (
  <Header as="h3" textAlign="center">
    Enrollment
    {/* <Link to="/"> Home</Link> */}
  </Header>
  
  
  )

};

export default Enrollment;