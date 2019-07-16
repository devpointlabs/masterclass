import React, {Fragment, useState, useEffect,}from 'react'; 
import {Form, Button, Card, Image, Icon} from 'semantic-ui-react'
import axios from 'axios'

const EditVideoForm = (props) => {
  const [formVideos, setFormVideos] = useState([])
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [showEditForm, setShowEditForm] = useState(false); 
  const [videos, setVideos] = useState([]); 

  // return existing videos 
  useEffect((e) => {
    // if not adding videos, then render existing videos, if any
      axios.get(`/api/lessons/${props.lesson_id}/videos`)
      .then( res => {
        // console.log(res.data)
        setVideos(res.data)
      })
  }, [])


// // be able to toggle one video edit at a time 
//   useEffect(()=>{
//     setFormVideos(videosWithShowForm)
//   },[videos])

//   const videosWithShowForm = videos.map(v=>{
//     return {
//       id: v.id,
//       title: v.title,
//       description: v.description,
//       lesson_id: v.lesson_id,
//       showForm: false,
//     }
//   })

//   // toggle video edit 
//   const toggleEditForm = (id, showForm) => {
//     videosWithShowForm.filter(v =>{
//       if(id === v.id)
//       {v.showForm = !showForm
//         return v
//         } 
//     }); 
//     setFormVideos(videosWithShowForm)
//  }

const toggleEditForm = () => {
  setShowEditForm(!showEditForm)
  console.log(showEditForm)
}


  // cancel edit form 
  // const closeEdit = (id) =>{
  //   setShowEditForm(!showEditForm)
  //  videosWithShowForm.filter(v =>{
  //    if(id === v.id)
  //    {v.showForm = false
  //      return v
  //      } 
  //  }); 
  //  setFormVideos(videosWithShowForm)
  // }

   //  will render the edit form for the videos 
   const renderEditForm = (id, showForm) => {
    return <h1>Works!</h1>
    
    }

   // remove videos 
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
              <Button size="tiny" color="blue" onClick={() => toggleEditForm()}>
              <Icon name={video.showEditForm ? "cancel" :"edit"} />
             </Button>
              <Button onClick={() => removeVideos(video.id)}>Remove</Button>
              </Button.Group>
              { video.showEditForm ? renderEditForm(video.id) : null}
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
