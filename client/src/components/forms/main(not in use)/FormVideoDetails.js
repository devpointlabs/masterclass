import React, {Fragment, useState, useEffect, useCallback,}from 'react'; 
import {Form, Button, Card, Image} from 'semantic-ui-react'
import axios from 'axios'
import styled from 'styled-components';
import { useDropzone } from 'react-dropzone';
import ImageUploader from "react-images-upload";
import {AuthContext } from '../../../providers/AuthProvider'; 


const FormVideoDetails = (props) => {
  // const { updateVideos,  } = useContext(AuthContext);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [showForm, setShowForm] = useState(false)
  const [videos, setVideos] = useState([]); 
  const [image, setImage] = useState("")
  const [video, setVideo] = useState([])
  const [file, setFile] = useState();
  const [fireVideo, setFireVideo]=useState(false)




  const onDrop=(image)=> {
    setImage(image[0])
  }
// proceed to the next step the form --------------------------------------
 const continueStep = (e) => {
    props.nextStep(); 
  }

  // go back to previous step in the form -----------------------------------
 const backStep = (e) => {
    props.previousStep(); 
  }

  // toggle form if adding or editing -------------------------------------
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
        // console.log(res.data)
        setVideos(res.data)
        // debugger
      })
    } else {
      // Adding videos axios call
    }

  }, [])
  // const updateVideos = () => {
  //   let data = new FormData();
  //   data.append("file", video.file);
  //   axios.put(`/api/lessons/${video.lesson_id}/${video.id}`,data)
  //     .then(res=>{
  //       setVideo(res.data)
  //     })
  // }
  
  
  
  // const handleSubmit = e => {
  //   e.preventDefault();
  //   axios.post(`/api/lessons/${props.lessonId}/videos`, {title: title, description: description,})
  //   .then(res=>{
  //     setVideo(res.data)
  //   })
  // }
 const  handleSubmit = (e) => {
   debugger
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


// RENDER EXISTING VIDEOS 
// TODO: Create videos comp with just the fragment and info in the card. Able to remove a video or edit (only) a title and description
  const renderVideos = () => {
    return videos.map((video) =>
      <Card>
      <Card.Header as="h3">{video.title}</Card.Header>
      <Card.Content>
        <Image size="small" src={video.url}/>
      </Card.Content>
      <Card.Content extra>
      <p>{video.description}</p>
      </Card.Content>
      </Card>
    )
}


 // RENDER EXISTING VIDEOS 
 const renderEditForm = () => {
  return (
    <>
        <Card fluid>
          <Card.Header as="h1" textAlign="center" style={{padding: "20px"}}>Your Existing Videos:</Card.Header>
          <Card.Group itemsPerRow={2} textAlign="center">
            {renderVideos()}
          </Card.Group>
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
    <Form.Button>Continue</Form.Button>
    <Button onClick={() => backStep()}>Back</Button>
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
