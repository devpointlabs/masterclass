import React, { useState, useEffect } from "react";
import axios from "axios";
import { Form, } from "semantic-ui-react";
import { useFormInput, } from "../hooks/useFormInput";

const CourseForm = props => {
  const [title, setTitle] = useState(useFormInput(""))
  const [category, setCategory] = useState(useFormInput(""))
  const [overview, setOverview] = useState(useFormInput(""))
  const [image, setImage] = useState(useFormInput(""))

  useEffect((e) => {
    if (props.course) {
      setTitle(props.course.title)
      setCategory(props.course.category)
      setOverview(props.course.overview)
      setImage(props.course.image)
    }
    else
      setTitle("")
    setCategory("")
    setOverview("")
    setImage("")
  }, []
  )



  const handleSubmit = e => {
    e.preventDefault();
    if (props.course) {
      axios
        .put(`/api/courses/${props.id}`, { title: title, category: category, overview: overview, image: image })
        .then(res => {
          props.edit(res.data);
          props.toggleForm();
        })
    }

    else {
      axios
        .post("/api/courses", { title: title, category: category, overview: overview, image: image })
        .then(res => {
          props.add(res.data);
          props.toggleForm();
        });
    };
  }


  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group widths='equal'>
        <Form.Input
          label='Title'
          placeholder='Title'
          name='title'
          required
          value={title}
          onChange={(e) => setTitle(e.target.value)}

        />
        <Form.Input
          label='Category'
          placeholder='Category'
          name='category'
          required
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        />
        <Form.Input
          label='Overview'
          placeholder='Overview'
          name='overview'
          required
          value={overview}
          onChange={(e) => setOverview(e.target.value)}
        />
        <Form.Input
          label='Image'
          placeholder='Image'
          name='image'
          required
          value={image}
          onChange={(e) => setImage(e.target.value)}
        />
      </Form.Group>
      <Form.Button floated="right" color="green" button>Add Lessons</Form.Button>
      <Form.Button>Submit</Form.Button>
    </Form >
  );
};

export default CourseForm;