import React, { useState, useEffect, } from "react";
import axios from 'axios'
import CommentForm from "./CommentForm";
import { Button, Card, Rating, Icon, } from "semantic-ui-react";

const Comment = (props) => {
  const [comment, setComment] = useState([])
  const [showForm, setShowForm] = useState(false);
  const video_id = props.video_id
  const comment_id = props.comment_id
  const comment_title = props.comment_title
  const comment_body = props.comment_body
  const comment_rating = props.comment_rating
  const delete_comment = props.delete_comment
  const edit_comment = props.edit_comment

  useEffect( () => {
    axios.get(`/api/videos/${video_id}/comments/${comment_id}`)
      .then( res => setComment(res.data))
  }, [])

  const toggleForm = () => {
    setShowForm(!showForm)
  }

  return (
    <>
      <Card.Content fluid>
        <Rating 
        rating = {comment_rating}
        defaultRating = {5}
        maxRating= {5}
        disabled
        icon='star'
        size= "massive"
      />
      </Card.Content>
      <Card.Content>
      <Card.Header>
          {comment_title}
      </Card.Header>
      <Card.Description>
        {comment_body}
      </Card.Description>
      <div style = {{
        display: 'flex',
        alignSelf:'flex-end',
        marginTop:'10px',
        width: '1000px'
      }}>
      <Card.Content>
        { showForm ? 
        <CommentForm
          editComment={edit_comment}
          video_id={props.video_id}
          comment_id={comment_id}
          comment_title={comment_title}
          comment_body={comment_body}
          toggleEdit={toggleForm}
        /> : 
        null}
      </Card.Content>
      </div> 
      </Card.Content>
      <Button.Group floated="right">
        <Button size="tiny" icon color='teal' onClick={() => toggleForm()}>
          <Icon name="edit"/>
        </Button>
        <Button size="tiny" icon color='red' onClick={()=> delete_comment(comment_id)}>
          <Icon name='trash'/>
        </Button>
      </Button.Group>
    </>
  )
}

export default Comment;