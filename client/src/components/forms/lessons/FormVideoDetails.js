import React, {Fragment, useState, useEffect, useCallback }from 'react'; 
import {Form, Button, Card} from 'semantic-ui-react'
import axios from 'axios'
import styled from 'styled-components';
import { useDropzone } from 'react-dropzone';
import {AuthContext } from '../providers/AuthProvider'; 


const FormVideoDetails = (props) => {
  const { updateVideos,  } = useContext(AuthContext);
  const [title, setTitle] = useState();
  const [description, setDescription] = useState();
  const [showForm, setShowForm] = useState(false)
  const [videos, setVideos] = useState(); 
  const [file, setFile] = useState();


 const continueStep = (e) => {
    props.nextStep(); 
  }
 const backStep = (e) => {
    props.previousStep(); 
  }

  const toggleForm = () => {
    setShowForm(!showForm)
  }

  // populate video title and video url. 
  useEffect((e) => {
    // if not adding videos, then render existing videos, if any
    if (!showForm && props.match.params.lesson_id) {
      const { lesson_id } = props.match.params
      axios.get(`/api/lessons/${lesson_id}/videos`)
      .then( res => {
        setVideos()
        console.log({title})
        debugger
      })
    } else {
      // Adding videos axios call
    }

  }, [])

  const handleSubmit = e => {
    e.preventDefault();
    // SEND VIDEO FILE TO DATABASE
    // updateVideos(videos.id, {file})
  
  }


    // DROPZONE FUNCTIONALITY 
   const StyledDropzone = (props) => { 
      const onDrop = useCallback(acceptedFiles => {
        setFile(acceptedFiles[0]); 
      }, [])

    const {
      getRootProps,
      getInputProps,
      isDragActive,
      isDragAccept,
      isDragReject
    } = useDropzone({onDrop});

    return (
      <div className="container">
        <Container {...getRootProps({isDragActive, isDragAccept, isDragReject})}>
          <input {...getInputProps()} />
          <p>Drag 'n' drop some files here, or click to select files</p>
        </Container>
      </div>
    );
  }

// ADD VIDEO FORM 
  const renderAddForm = () => {
    return (
      <>
      <Form onSubmit={handleSubmit}>
      <Form.Group widths='equal'>
        <Form.Input
          label='Title'
          placeholder='What best describes the content of the video?'
          name='title'
          // required
          value={title}
          onChange={(e) => setTitle(e.target.value)}

        />
        {/* TODO: Turn to textarea - keeps saying that value is not a valid prop */}
        <Form.Input
          label='Description'
          placeholder='Give a short summary of the content of the video...'
          name='description'
          // required
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </Form.Group>
      <br />
      <StyledDropzone />
      <br />
      <Form.Button>Continue</Form.Button>
      <Button onClick={() => backStep()}>Back</Button>
    </Form>
    </>
    )
  }

  // RENDER EXISTING VIDEOS 
  const renderEditForm = () => {
    return (
      <>
          <Card fluid>
            <Card.Header textAlign="center">Render Existing Videos Here</Card.Header>
            <br/>
            <br/>
            <Button.Group>
              <Button onClick={() => backStep()}>Back</Button>
              <Button onClick={() => continueStep()}>Continue</Button>
            </Button.Group>
          </Card>
          

      </>
    )

  }




  return (
    <Fragment>
    <Button onClick={() => toggleForm()}>Add Videos</Button>
    {showForm ? renderAddForm() : renderEditForm()} 
  </Fragment>
  )
}

// STYLES FOR DROPZONE 
const getColor = (props) => {
  if (props.isDragAccept) {
      return '#00e676';
  }
  if (props.isDragReject) {
      return '#ff1744';
  }
  if (props.isDragActive) {
      return '#2196f3';
  }
  return '#bdbdbd';
}

const Container = styled.div`
  flex: 1;
  text-align: center; 
  height: 250px; 
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  border-width: 3px;
  border-radius: 2px;
  border-color: ${props => getColor(props)};
  border-style: dashed;
  background-color: #eeee;
  color: #bdbdbd;
  outline: none;
  transition: border .24s ease-in-out;
`;

export default FormVideoDetails;
