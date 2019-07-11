import React, { useState, useEffect,} from "react";
import axios from "axios";
import { Form, Header } from "semantic-ui-react";

const EditCourseForm = (props) => {
  const [title, setTitle] = useState()
  const [category, setCategory] = useState()
  const [overview, setOverview] = useState()
  const [image, setImage] = useState()
  const [course, setCourse] = useState(); 


  useEffect(() => {
    if (props.match.params.course_id) {
      const {course_id} = props.match.params
      axios.get(`api/courses/${course_id}`)
      .then(res => {
       
        setTitle(res.data.title)
        setOverview(res.data.overview)
        setImage(res.data.image)
        setCategory(res.data.category)
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
    if (props.match.params.course_id) {
      axios
        .put(`/api/courses/${props.match.params.id}`, { title: title, category: category, overview: overview, image: image })
        .then(res => {
          setCourse(res.data);
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


  return (
    <>
    <Header as="h1" textAlign="center">Edit Your Course</Header>
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
        <Form.Input
          label='Category'
          placeholder='What field of study?'
          name='category'
          required
          value={category}
          onChange={(e) => setCategory(e.target.value)}
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
