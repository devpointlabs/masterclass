import React, {Fragment, useState, useEffect,}from 'react'; 
import {Form, Button, Card, Image} from 'semantic-ui-react'
import axios from 'axios'

const EditVideoForm = (props) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [videos, setVideos] = useState([]); 


  useEffect((e) => {
    // if not adding videos, then render existing videos, if any
      axios.get(`/api/lessons/${props.lesson_id}/videos`)
      .then( res => {
        // console.log(res.data)
        setVideos(res.data)
      })
  }, [])

  const removeVideos = (id) => {
    axios.delete(`/api/lessons/${props.lesson_id}/videos/${id}`)
    .then(res => {
      setVideos(videos.filter( v => v.id !== id))
    })

  }


 

   // RENDER EXISTING VIDEOS 
 const renderVideos = () => {
  return (
    <>
          <Card.Group itemsPerRow={2} textAlign="center">
            {videos.map((video) =>
              <Card>
              <Button.Group size="tiny">
              <Button>Edit</Button>
              <Button onClick={() => removeVideos(video.id)}>Remove</Button>
              </Button.Group>
              <Card.Header as="h3">{video.title}</Card.Header>
              <p>{video.description}</p>
              <Card.Content>
                <Image size="small" src={video.url}/>
              </Card.Content>
              {/* <Card.Content extra>
              </Card.Content> */}
              </Card>
    )}
          </Card.Group>
    </>
  )

}

  return (
    <div>
      {renderVideos()}
    </div>
  )
}

export default EditVideoForm
