import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { Form, } from "semantic-ui-react";
import {AuthContext} from "../../../providers/AuthProvider"; 

const FormCourseDetails = (props) => {
  const [title, setTitle] = useState()
  const [category, setCategory] = useState()
  const [overview, setOverview] = useState()
  const [image, setImage] = useState()
  const [course, setCourse] = useState(); 


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
    if (props.match.params.id) {
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
          continueStep(); 
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
      
      <Form.Button color="green" inverted>Continue</Form.Button>
    </Form >
  );
};

export default FormCourseDetails;