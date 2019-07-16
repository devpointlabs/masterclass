import React, { Fragment, useState, useEffect } from 'react';
import { Form, Header, Button } from 'semantic-ui-react'
import axios from 'axios'

const EditLessonDetails = (props) => {
  const [name, setName] = useState();
  const [showForm, setShowForm] = useState(false)
  const [description, setDescription] = useState();
  const [lesson, setLesson] = useState();


   // populate video title and video url. 
  useEffect((e) => {
    if (props.lesson_id) {
      axios
        .get(`/api/lessons/${props.lesson_id}`)
        .then(res => {
          setName(res.data.name)
          setDescription(res.data.description)
        })
    }
  }, [])

  const handleSubmit = e => {
    e.preventDefault();
      axios
        .put(`/api/lessons/${props.lesson_id}`, { name: name, description: description })
        .then(res => {
         setLesson(res.data); 
         console.log(res.data)
         props.closeEdit(props.lesson_id)
        //  props.setShowEditForm(!props.showEditForm)
        })
    }

  return (
    <Fragment>
    <Form onSubmit={handleSubmit}>
      <Form.Group widths='equal'>
        <Form.Input
          label='Name'
          placeholder='What best describes what will be taught?'
          name='name'
          required
          value={name}
          onChange={(e) => setName(e.target.value)}

        />
        {/* TODO: Turn to textarea - keeps saying that value is not a valid prop */}
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
        Save
        </Form.Button>
    </Form >

  </Fragment >
  )
}

export default EditLessonDetails
