import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { Form, Header, Button } from "semantic-ui-react";
import { AuthContext } from "../../../providers/AuthProvider";

const FormCourseDetails = (props) => {
  const [title, setTitle] = useState("")
  const [category, setCategory] = useState("")
  const [overview, setOverview] = useState("")
  const [image, setImage] = useState("")
  const [course, setCourse] = useState("");


  // useEffect(() => {
  //   if (props.match.params.id) {
  //     const {id} = props.match.params
  //     axios.get(`api/courses/${id}`)
  //     .then(res => {
  //       setTitle(res.data.title)
  //       setOverview(res.data.overview)
  //       setImage(res.data.image)
  //       setCategory(res.data.category)
  //     })
  //   }
  // }, []
  // )


  const continueStep = (e) => {
    // e.preventDefault(); 
    props.nextStep();
  }

  const handleSubmit = e => {
    e.preventDefault();
    // if (props.match.params.id) {
    //   axios
    //     .put(`/api/courses/${props.match.params.id}`, { title: title, category: category, overview: overview, image: image })
    //     .then(res => {
    //       setCourse(res.data);
    //     })
    // }

    // else {
    axios
      .post("/api/courses", { title: title, category: category, overview: overview, image: image })
      .then(res => {
        setCourse(res.data);
        props.getCourseId(res.data.id);
        continueStep();
      });
    // };
  }


  return (
    <>
      <Header as="h1" textAlign="center">Create Your Course</Header>
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

        <Form.Button color="green" inverted>Continue</Form.Button>

        <Button onClick={() => props.history.goBack()} color="red" inverted>Cancel</Button>

      </Form >
    </>
  );
};

export default FormCourseDetails;


