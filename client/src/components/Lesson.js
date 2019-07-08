import React, {useEffect, useState} from "react";
import {  Image,Icon,  Card, Button, Container} from "semantic-ui-react";
import { Link, } from "react-router-dom";
import axios from 'axios'
// import {AuthContext} from 

const Lesson = (props) =>{
  const [videos, setVideos] = useState([])
  const [lesson, setLesson] = useState({})
  // const {user } = useContext(AuthContext)

  useEffect(()=>{
    const {id } = props.match.params
    
    axios.get(`/api/lessons/${id}`)
    .then(res =>setLesson(res.data))

    axios.get(`/api/lessons/${id}/videos`)
    .then(res =>setVideos(res.data))
  },[])

  const listVideos = () =>{
    const {id } = props.match.params
    return videos.map(v =>(
      <>
        <div style={{ marginTop: '40px', padding: '20px', border: '1px solid black' }}>
          <Link to={`/lessons/${id}/videos/${v.id}`}>
            <Card>
              
            <Card.Header as = "h1">{v.title}</Card.Header>
            <Card.Description as = "h3">{v.description}</Card.Description>
            <Image src = {v.url}/>
            </Card>
          </Link>
        </div>
      </>
    ))
  }
  // const renderButtons= () =>{
  //   if 
  // }

  const handleDelete = () =>{
    const {id } = props.match.params
    axios.delete(`/api/lessons/${id}`)
    .then(res => {
      this.props.history.push("/lessons")
    })
  }
  const lesson_id = lesson.id
  const name = lesson.name
  return (
    
    <>
      <Container>
      <Link to={'/'}>
          <Button color="black">
            <Icon name='arrow alternate circle left outline' />
            Go Back
          </Button>
        </Link>
        <h1 style={{ marginTop: '30px' }}>{name}</h1>
        <div>
          <Link to ={`/lessons/${lesson_id}/edit`}>
          <Button inverted color='blue'>
              <Icon name='pencil' />
              Update Lesson
              </Button>
          </Link>
          <Button inverted onClick={handleDelete} color='red'>
            <Icon name='trash' />
            Remove Lesson
            </Button>
          <Link to={`/lessons/${lesson_id}/videos/new`}>
            <Button inverted color='green'>
              <Icon name='add' />
              Add Video
            </Button>
          </Link>
          <Card.Group itemsPerRow = {3}>
            {listVideos()}
          </Card.Group>
        </div>


      </Container>
    </>
  )


}

export default Lesson;