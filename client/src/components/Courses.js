import React, { Fragment, useState, useEffect, useContext } from "react";
import { Card, Container, Button, Icon } from "semantic-ui-react";
import CourseForm from './CourseForm';
import Course from "./Course";
import { Link } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../providers/AuthProvider";






const Courses = (props) => {
  const [showForm, setShowForm] = useState(false);
  const [courses, setCourses] = useState([]);
  const {user } = useContext(AuthContext)



  useEffect((e) => {
    // if ()
    axios.get("/api/courses")
      .then(res => {
        setCourses(res.data)
      })

  }, [])

  return (
    <Fragment>
      <Container>
        {showForm &&
          <CourseForm toggleForm={setShowForm}
            add={course => setCourses([...courses, course])}
          />
        }
        {user && <Button inverted color='green' onClick={() => setShowForm(!showForm)}>
          {showForm ? "Cancel" : "Add Course"}
        </Button>}
      </Container>

      <br />
      {courses.map((item) => (
        <Card key={item.id}>
          <Card.Content textAlign="center">
            {item.image}
            Image Goes Here
          </Card.Content>
          <Card.Header as="h3">
            <Link to={{ pathname: `/courses/${item.id}` }}>
              {item.title}
            </Link>
          </Card.Header>
          <Card.Meta>
            Overview goes here
            {item.overview}
          </Card.Meta>
        </Card>

      ))}
    </Fragment>

  );
};

export default Courses;
