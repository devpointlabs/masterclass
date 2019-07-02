import React, { useState, useEffect, } from "react";
import axios from "axios";
import CommentForm from "./CommentForm"
import { Card, Rating, Icon, Segment, List, Button, } from "semantic-ui-react";
import { Link, } from "react-router-dom";

const Comments = (props)=>{
  const [comments, setComments] = useState([])
  const [showForm, setShowForm] = useState(true)

  useEffect(()=>{
    const id = props.video_id
    axios.get(`/api/videos/${id}/comments`)
    .then(res => {
      setComments(res.data)})
  },[])

  const toggle = () =>{
    setShowForm(!showForm)
  }

  const addComment = (comment) =>{
    setComments({comments, ...comment})
  }

  const renderForm = () =>{
    if(showForm){
      return(
        <CommentForm
        addComment ={addComment}
        video_id = {props.video_id}
        toggle={toggle}
        />
      )
      return null
    }
  }
  
  const deleteComment = (c_id) =>{
    axios.delete(`/api/videos/${props.video_id}/comments/${c_id}`)
    .then(res =>{
      setComments(comments.filter(c => c.id !== c_id))
      })
     
  }


 const  showComments = () =>{
    // const video_id = props.match.params.id
    return comments.map(c=>(
      <Card fluid>
        <Card.Content>
          <Rating 
          rating = {c.rating}
          defaultRating = {5}
          maxRating= {5}
          disabled
          icon='thumgs up'
          size= "massive"
          />

        </Card.Content>
        <Card.Content>
        <Card.Header>
            {c.title}
          </Card.Header>
          <Card.Description>
            {c.body}
          </Card.Description>
          <div style = {{
            display: 'flex',
            alignSelf:'flex-end',
            marginTop:'10px',
            width: '100px'
          }}>
            <Button icon color='red' onClick={()=> deleteComment(c.id)}>
            <Icon name='trash'/>
            </Button>
            <Link to ={{
              pathname: `/comments/${c.id}/edit`,
              state: {
                  video_id: props.video_id,
              }
            }}>  <Button icon color="blue">
            <Icon name="edit"/>
          </Button>
        </Link></div>
        </Card.Content>
      </Card>
    ))
  }

  return(
    <>
     <div style= {{marginTop: '30px'}}>
          <hr/>
          <h1>Comments</h1>
          <Button color='teal' onClick={toggle}>
            <Icon name='comment alternate outline'/>
            Write a Comment
          </Button>
          {renderForm()}
          <div style={{display:'flex', justifyContent:'flex-start', marginTop:'30px'}}>
            <Card.Group itemsPerRow={3}>
              {showComments()}
            </Card.Group>
          </div>
        </div>
    </>
  )
  
}

export default Comments;