import React, { Fragment, useState, useEffect, useCallback} from 'react'; 
import axios from 'axios'; 
// import {AuthContext } from '../providers/AuthProvider'; 
import {Form,} from 'semantic-ui-react'; 
import {useFormInput} from '../hooks/useFormInput'; 
import {useDropzone} from 'react-dropzone';
import styled from 'styled-components';
import Videos from './Videos';

//TODO: render link in create new course form with a pathway and props being passed in an object

const LessonForm = (props) => {
  const [name, setName] = useState(useFormInput("")); 
  const [description, setDescription] = useState(useFormInput(""));
  const [file, setFile] = useState(""); 
  const [editing, setEditing] = useState(false); 


  // check if form is editing and render different title and all existing lesson videos with options to delete each video. 
  // populate video title and video url. 
   useEffect((e) => {
     if(props.lesson) {
       setName(props.lesson.name)
       setDescription(props.lesson.description)
     } else {
       setName(""); 
       setDescription(""); 
     }
   }, [])

   const handleSubmit = (e) => {
    e.preventDefault(); 

   }

// function to append data to form and if editing, spread existing content 
const addFile 


// styled component functionality 
   const StyledDropzone = (props) => {
      // taken from docs 
      const onDrop = useCallback(acceptedFiles => {
        // Do something with the files
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
      <Form.Button>Submit</Form.Button>
    </Form>
    <br/>
    {/* render all existing videos */}
    <StyledDropzone />
    </Fragment>
  )
}


// styles for StyledDropZone
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

export default LessonForm; 
