import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { Form, Header, Button, Segment, Select, Dropdown } from "semantic-ui-react";

const AddCourses = (props) => {
  const [title, setTitle] = useState();
  const [category, setCategory] = useState();
  const [overview, setOverview] = useState();
  const [image, setImage] = useState();
  const [course, setCourse] = useState();
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    axios.get("/api/categories")
      .then(res => {
        setCategories(res.data)
      })
  }, []
  )

  const handleSubmit = e => {
    e.preventDefault();
    console.log(category)
    axios
      .post("/api/courses", { title: title, category: category, overview: overview, image: image })
      .then(res => {
        setCourse(res.data);
        props.history.push("/teachers/courses");
      });
    // };
  }

  const categoryOptions = () => {
    let catArray = []
    categories.map(cat => {
      let object = { key: cat.category, text: cat.category, value: cat.category }
      catArray.push(object)
    })
    return (catArray)
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
          <Segment>
            <Form.Select
              label="Course Category"
              placeholder='e.g. Ruby on Rails'
              name='category'
              Select
              value={category}
              options={categoryOptions()}
              onChange={(e) => setCategory(e.target.innerText)}
            />
            <Form.Input
              label="+Category"
              placeholder="Add New Category"
              name='category'
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            />
          </Segment>
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
        <Button.Group>
          <Form.Button onClick={() => props.history.goBack("/teachers/courses")}>Cancel</Form.Button>
          <Button.Or />
          <Form.Button positive>Submit</Form.Button>
        </Button.Group>
      </Form >

    </>
  );
};

export default AddCourses;


{/* <Segment>
  <br />
  <Form.Input
    label="+ Category"
    placeholder="New Category"
    name='category'
    value={category}
    onChange={(e) => setCategory(e.target.innerText)}
  />
</Segment> */}
