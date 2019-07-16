import React, { useState, useEffect, } from "react";
import axios from "axios";
import { Form, Header, Select } from "semantic-ui-react";

const EditCourseForm = (props) => {
  const [title, setTitle] = useState()
  const [category, setCategory] = useState()
  const [overview, setOverview] = useState()
  const [image, setImage] = useState()
  const [course, setCourse] = useState();
  const { course_id } = props.match.params;


  useEffect(() => {
    if (props.match.params.course_id) {
      axios.get(`/api/courses/${course_id}`)
        .then(res => {
          setTitle(res.data.course.title)
          setOverview(res.data.course.overview)
          setImage(res.data.course.image)
          setCategory(res.data.course.category)
        })
    }
  }, []
  )


  const continueStep = (e) => {
    // e.preventDefault(); 
    props.nextStep();
  }

  const handleSubmit = e => {
    e.preventDefault();
    if (course_id) {
      axios
        .put(`/api/courses/${course_id}`, { title: title, category: category, overview: overview, image: image })
        .then(res => {
          setCourse(res.data);
          props.getCourseId(res.data.id);
        })
    }

    else {
      axios
        .post("/api/courses", { title: title, category: category, overview: overview, image: image })
        .then(res => {
          setCourse(res.data);
          props.getCourseId(res.data.id);
        });
    };
  }

  const categoryOptions = [
    { key: 'r', text: 'Ruby', value: 'Ruby' },
    { key: 'js', text: 'JavaScript', value: 'JavaScript' },
    { key: 're', text: 'React', value: 'React' },
  ]


  return (
    <>
      <Header as="h1" textAlign="center">Manage Your Course</Header>
      <Form onSubmit={handleSubmit}>
        <Form.Group widths='equal'>
          <Form.Input
            label='Title'
            placeholder='Please enter a title...'
            name='title'
            required
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <Form.Select
            label="Field of Study?"
            placeholder='e.g. Ruby on Rails'
            name='category'
            required
            Select
            value={category}
            options={categoryOptions}
            onChange={(e) => setCategory(e.target.innerText)}
          />
          <Form.Input
            label='Overview'
            placeholder='What will be covered?'
            name='overview'
            required
            value={overview}
            onChange={(e) => setOverview(e.target.value)}
          />
          <Form.Input
            label='Image'
            placeholder='Put a thumbnail!'
            name='image'
            required
            value={image}
            onChange={(e) => setImage(e.target.value)}
          />
        </Form.Group>

        <Form.Button color="green" inverted>Save Changes</Form.Button>
      </Form >
    </>
  );
};

export default EditCourseForm;
