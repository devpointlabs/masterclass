import React, { Fragment, useState, useEffect} from "react";
import {  Card } from "semantic-ui-react";
import { Link } from "react-router-dom";
import axios from "axios";

const Courses = (props) => {
  const [
    courses,
    setCourses
  ] = useState([]);

  useEffect(() => {
    axios.get("/api/courses")
    .then(res => {
      setCourses(res.data)
    })

  }, [])


  return (
    <Fragment>
      {courses.map((item) => (
        <Card key={item.id}>
          <Card.Content textAlign="center">
            {item.image} 
            Image Goes Here
          </Card.Content>
          <Card.Header as="h3">
          <Link to={{pathname: `/courses/${item.id}`}}>
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
