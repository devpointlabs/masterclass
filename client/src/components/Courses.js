import React, { Fragment, useState } from "react";
import { Header, Card } from "semantic-ui-react";
import Course from "./Course";
import { Link } from "react-router-dom";

const Courses = (props) => {
  const [
    courses,
    setCourses
  ] = useState([]);

  return (
    <Fragment>
      {courses.map((course) => (
        <Card>
          <Course key={course.id} />
        </Card>
      ))}
    </Fragment>
  );
};

export default Courses;
