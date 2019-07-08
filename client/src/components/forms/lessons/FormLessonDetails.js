import React, {Fragment, useState, useEffect }from 'react'; 
import {Form, Header} from 'semantic-ui-react'
import axios from 'axios'


const FormLessonDetails = (props) => {
  const [name, setName] = useState();
  const [description, setDescription] = useState();


 const continueStep = (e) => {
    // e.preventDefault(); 
    props.nextStep(); 
  }

  // populate video title and video url. 
  useEffect((e) => {
    if (props.match.params.lesson_id) {
      const { lesson_id } = props.match.params
      axios
        .get(`/api/lessons/${lesson_id}`)
        .then(res => {
          setName(res.data.name)
          setDescription(res.data.description)

        })
    }

  }, [])

  const handleSubmit = e => {

    e.preventDefault();
    if (props.match.params.lesson_id) {
      axios
        .put(`/api/lessons/${props.match.params.lesson_id}`, { name: name, description: description })
        .then(res => {
          // props.history.push(`/courses/${res.data.course_id}`)
          // instead of pushing back to courses, it will push to the next form component
          continueStep(); 
        })
    }

    else {
      axios
        .post("/api/courses/${course_id}/lessons", { name: name, description: description })
        .then(res => {
          console.log(res.data)
          // add(res.data);

        });
    };
  }




  return (
    <Fragment>
      <Header as="h1" textAlign="center">Edit Your Lesson</Header>
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
      <Form.Button fluid>Continue</Form.Button>
    </Form>

  </Fragment>
  )
}

export default FormLessonDetails;
