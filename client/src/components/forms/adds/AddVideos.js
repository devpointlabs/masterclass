import React, {Fragment, useState, useEffect, useCallback,}from 'react'; 
import {Form, Button, Card, Image} from 'semantic-ui-react'
import axios from 'axios'
import styled from 'styled-components';
import { useDropzone } from 'react-dropzone';
import ImageUploader from "react-images-upload";
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'
import {AuthContext } from '../../../providers/AuthProvider'; 


const AddVideos = (props) => {
  const videoState = {
    title: "",
    description: "",
    url: "", 
  }
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [videos, setVideos] = useState([]); 
  const [image, setImage] = useState("")
  const [video, setVideo] = useState(videoState)
  const [boob, setBoob] = useState();
  // const [drop, setDrop] = useState({})



  

 const  handleSubmit = (e) => {
    e.preventDefault();
    const {title, description, url} = video
    let data = new FormData()
    data.append('file', boob)
    data.append("title", title);
    data.append("description", description);

   
    axios.post(`/api/lessons/${props.lesson_id}/videos?title=${title}&description=${description}`, data)
      .then( res => {
        setTitle("")
        setDescription("")
      })
      .catch(err => {
        console.log("You're an idiot")
      })
      setTitle("")
      setDescription("")
      setImage("")
    
  }
  const handleChange = (name) => (e) => {
    // const { value, } = e.target;
    setVideo({...video, [name]: e.target.value})
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
        value={video.title}
        onChange={handleChange("title")}

      />
      {/* TODO: Turn to textarea - keeps saying that value is not a valid prop */}
      <Form.Input
        label='Description'
        placeholder='Give a short summary of the content of the video...'
        name='description'
        // required
        value={video.description}
        onChange={handleChange("description")}
      />
    </Form.Group>
    <br />
    <StyledDropzone />
    {/* <ImageUploader
          withPreview={true}
          withIcon={true}
          buttonText="Choose image"
          onChange={onDrop}
          imgExtension={[".jpg", ".gif", ".png", ".gif", ".mov"]}
          maxFileSize={5242880}
          singleImage={true}
          /> */}
    <br />
    <Form.Button>Submit</Form.Button>
  </Form>
  </>
  )
} 


    // DROPZONE FUNCTIONALITY 
   const StyledDropzone = (props) => { 
      const onDrop = useCallback(acceptedFiles => {
        setBoob(acceptedFiles[0]); 
      }, [])

    const {
      getRootProps,
      getInputProps,
      isDragActive,
      isDragAccept,
      isDragReject
    } = useDropzone({onDrop});

    return (
      <>
      
      <div className="container">
        <Container {...getRootProps({isDragActive, isDragAccept, isDragReject})}>
          <input {...getInputProps()} />
          <p>Drag 'n' drop some files here, or click to select files</p>
        </Container>
      </div>
      </>
    );
  }


 

// MAIN FUNCTIONALITY 
  return (
    <Fragment>
    {renderAddForm()} 
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

export default AddVideos;