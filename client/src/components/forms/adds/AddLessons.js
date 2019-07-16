import React, { Fragment, useState, useEffect } from 'react';
import { Form, Header, Button } from 'semantic-ui-react'
import axios from 'axios'
import { Link } from 'react-router-dom';

const AddLessons = (props) => {
  const [name, setName] = useState();
  const [description, setDescription] = useState();
  const [lesson, setLesson] = useState();



  const handleSubmit = e => {
    e.preventDefault();
    axios
      .post(`/api/courses/${props.course_id}/lessons`, { name: name, description: description })
      .then(res => {
        setLesson(res.data);
        setName(""); 
        setDescription(""); 
        props.setShowCreateForm(!props.showCreateForm)
        // props.getLessonId(res.data.id);

        
      });
  }




  return (
    <Fragment>
      <Header as="h1" textAlign="center">Create Your Lesson</Header>
      <Form onSubmit={handleSubmit}>
        <Form.Group widths='equal'>
          <Form.Input
            label='Name'
            placeholder='What will be taught?'
            name='name'
            required
            value={name}
            onChange={(e) => setName(e.target.value)}

          />
          <Form.Input
            label='Description'
            placeholder='What will the lesson cover? '
            name='description'
            required
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </Form.Group>
        <Form.Button inverted color="green" >
          Submit
          </Form.Button>
      </Form >

    </Fragment >
  )

}

export default AddLessons
