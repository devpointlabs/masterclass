import React, {Fragment, useState, useEffect, useCallback,}from 'react'; 
import {Form, Button, Card, Image} from 'semantic-ui-react'
import axios from 'axios'
import styled from 'styled-components';
import { useDropzone } from 'react-dropzone';
import ImageUploader from "react-images-upload";
import {AuthContext } from '../../../providers/AuthProvider'; 


const AddVideos = (props) => {
  // const { updateVideos,  } = useContext(AuthContext);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [videos, setVideos] = useState([]); 
  const [image, setImage] = useState("")
  const [video, setVideo] = useState([])
  const [file, setFile] = useState();




  const onDrop=(image)=> {
    setImage(image[0])
  }

 const  handleSubmit = (e) => {
    e.preventDefault();
    let data = new FormData()
    data.append('file', image)
    data.append("title", title);
    data.append("description", description);
    data.append("lesson_id", props.lessonId)

    if(video.id){
      axios.put(`/api/videos/${video.id}`, data)
      .then( res => {
        debugger
      })
      .catch(err => {
        console.log("error in handleSubmit")
      })
    }else{
    axios.post(`/api/videos?title=${title}&description=${description}`, data)
      .then( res => {
        debugger
      })
      .catch(err => {
        console.log("error")
      })
      setTitle("")
      setDescription("")
      setImage("")
    }
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
    {/* <StyledDropzone /> */}
    <ImageUploader
          withPreview={true}
          withIcon={true}
          buttonText="Choose image"
          onChange={onDrop}
          imgExtension={[".jpg", ".gif", ".png", ".gif"]}
          maxFileSize={5242880}
          singleImage={true}
          />
    <br />
    <Form.Button>Submit</Form.Button>
  </Form>
  </>
  )
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