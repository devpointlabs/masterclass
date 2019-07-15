import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { Form, Header, Dropdown } from "semantic-ui-react";
import { AuthContext } from "../providers/AuthProvider"

const CourseForm = (props) => {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState();
  const [overview, setOverview] = useState("");
  const [image, setImage] = useState("");
  const [course, setCourse] = useState("");


  // useEffect(() => {
  //   if (props.course) {
  //     setTitle(props.course.title)
  //     setCategory(props.course.category)
  //     setOverview(props.course.overview)
  //     setImage(props.course.image)
  //   }
  // }, []
  // )

  const handleCategory = (e) => {
    debugger
    let catChoice = e.target.textContent
    setCategory(catChoice)
  }

  const handleSubmit = e => {
    e.preventDefault();
    // if (props.course) {
    //   axios
    //     .put(`/api/courses/${props.id}`, { title: title, category: category, overview: overview, image: image })
    //     .then(res => {
    //       props.edit(res.data);
    //       props.toggleEdit();
    //     })
    // }

    // else {

    axios
      .post("/api/courses", { title: title, category: category, overview: overview, image: image })
      .then(res => {
        setCourse(res.data);
        props.history.goBack("/teachers/courses");
      });
    // };
  }

  const categoryOptions = () => {
    const cats = [{ key: 'r', text: 'Ruby', value: 'ruby' },
    { key: 'js', text: 'Javascript', value: 'javascript' },
    { key: 're', text: 'React', value: 'react' }]

    return (
      <Dropdown
        label="Category"
        placeholder='e.g. Ruby on Rails'
        name='category'
        required
        options={cats}
        value={category}
        onChange={handleCategory}
      />
    )
  }


  return (

    <>
      <Header as="h1" textAlign="center">Create A Course</Header>
      <Form onSubmit={handleSubmit}>
        <Form.Group widths='equal'>
          <Form.Input
            label='Course Title'
            placeholder='e.g. Add Photos Using Cloudinary'
            name='title'
            required
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <Form.Input

            value={category}
            control={categoryOptions}
          />
          <Form.Input
            label='Overview'
            placeholder='e.g. Cloudinary Start to Finish Implementation'
            name='overview'
            required
            value={overview}
            onChange={(e) => setOverview(e.target.value)}
          />
          <Form.Input
            label='Image'
            placeholder='e.g. Photo to Represent Course'
            name='image'
            required
            value={image}
            onChange={(e) => setImage(e.target.value)}
          />
        </Form.Group>

        <Form.Button color="green" inverted>Submit</Form.Button>
      </Form >
    </>
  );
};

export default CourseForm;
