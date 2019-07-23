import React, { Fragment, useState, useEffect } from 'react';
import { Form, Header, Button } from 'semantic-ui-react'
import axios from 'axios'

const EditVideoDetails = (props) => {
  const [title, setTitle] = useState();
  const [showForm, setShowForm] = useState(false)
  const [description, setDescription] = useState();
  const [video, setVideo] = useState();

  useEffect((e) => {
      axios
        .get(`/api/lessons/${props.lesson_id}/videos/${props.video_id}`)
        .then(res => {
          setTitle(res.data.title)
          setDescription(res.data.description)
        })
    
  }, [])
  const handleSubmit = e => {
    e.preventDefault();
      axios
        .put(`/api/lessons/${props.lesson_id}/videos/${props.video_id}`, { title: title, description: description })
        .then(res => {
         setVideo(res.data); 
        })
    }
  return (
    <Fragment>
    <Form onSubmit={handleSubmit}>
      <Form.Group widths='equal'>
        <Form.Input
          label='Title'
          placeholder='What best describes what will be taught?'
          name='title'
          required
          value={title}
          onChange={(e) => setTitle(e.target.value)}

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

export default EditVideoDetails
