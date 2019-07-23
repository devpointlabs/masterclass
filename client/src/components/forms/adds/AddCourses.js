import React, { useState, useEffect, useContext } from "react";
import {Link} from "react-router-dom"
import axios from "axios";
import styled from 'styled-components'
import ReactQuill from 'react-quill'
import logo from '../../Images/Logo.png'
import { Form, Header, Button, Segment, Select, Dropdown, Icon, Menu, Sidebar } from "semantic-ui-react";

const AddCourses = (props) => {
 
    const [body, setBody] = useState("")
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [overview, setOverview] = useState();
  const [course, setCourse] = useState();
  const [categories, setCategories] = useState([]);
  const [visible, setVisible] = useState(false);


  useEffect(() => {
    axios.get("/api/categories")
      .then(res => {
        setCategories(res.data)
      })
  }, [])
  const handleHideClick = () => setVisible(false); 
  const handleShowClick = () => setVisible(true); 
  const handleSidebarHide = () => setVisible(false)

  const handleSubmit = e => {
    e.preventDefault();
    debugger
    axios
      .post("/api/courses", { title: title, category: category, overview: body, image:logo})
      .then(res => {
        setCourse(res.data);
        props.history.push("/teachers/courses");
      });
    // };
  }
  // const handleChange = (name) => (e) =>{
  //   setForm({...form, [name]: e.target.value})
  // }
  const handleQuill  = (e) =>{
    setBody(e)
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

      <Button.Group>
          <Button disabled={visible} onMouseOver={handleShowClick}>
            Show sidebar
          </Button>
          <Button disabled={!visible} onMouseOver={handleHideClick}>
            Hide sidebar
          </Button>
        </Button.Group>
        <Sidebar.Pushable as ={Segment}>
      <Sidebar
       as={Menu}
       animation='overlay'
       icon='labeled'
       inverted
       onHide={handleSidebarHide}
       vertical
       visible={visible}
       width='thin'
      >
         <Link to="/teachers/courses">
            <Menu.Item as='a'>
              <Icon name='file video outline' />
              Courses
            </Menu.Item>
            </Link>
            <Link to="/teachers/QandA">
            <Menu.Item as='a'>
              <Icon name='comments outline' />
              Q&A
            </Menu.Item>
            </Link>
            <Link to="/forms/create">
                <Menu.Item as='a'>
                  <Icon name='plus square outline' />
                   New Course
                </Menu.Item>
            </Link>

      </Sidebar>
      <Container>
      <Header as="h1" textAlign="center">Create A Course</Header>
      <Form onSubmit={handleSubmit}>
        <Form.Group widths='equal'>
          <Form.Input
            label='Course Title'
            placeholder='Enter title'
            name='title'
            required
            value={title}
            onChange={e=>setTitle(e.target.value)}
          />
            <Form.Select
              label="Course Category"
              placeholder='e.g. Ruby on Rails'
              name='category'
              Select
              value={category}
              options={categoryOptions()}
              onChange={e =>setCategory(e.target.innerText)}
            />
        </Form.Group>
          <ReactQuill
          onChange={handleQuill}
          theme="snow"
          label="Overview"
          name = "overview"
          type="text"
          value={body}
          style={{height: 250}}
          />
          <br/>
          <br/>
          <br/>
        <Button.Group>
          <Form.Button onClick={() => props.history.goBack("/teachers/courses")}>Cancel</Form.Button>
          <Button.Or />
          <Form.Button positive>Submit</Form.Button>
        </Button.Group>
      </Form >
      </Container>
      </Sidebar.Pushable>

    </>
  );
};

const Container = styled.div`
height: 100vh;
padding: 15px;

`

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
