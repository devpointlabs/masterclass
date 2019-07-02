import React, { useState, useEffect, } from "react";
import axios from 'axios'
import CommentForm from "./CommentForm";
import { Header, Segment, Button, } from "semantic-ui-react";

const Comment = (props) => {
  const [comment, setComment] = useState([])
  const [showForm, setShowForm] = useState(false);
  const video_id = props.match.params.video_id

  useEffect( () => {
    axios.get(`/api/videos/${video_id}/comments/${props.comment_id}`)
      .then( res => setComment(res.data))
  }, [])

  const toggleForm = () => {
    setShowForm(!showForm)
  }

  const commentAdd = (data) => {
    setComment(data)
  }

  return (
    <>
      <Header>{props.comment_title}</Header>
      <p>{props.comment_body}</p>
      {showForm ? <CommentForm 
        comment_id={props.comment_id} 
        video_id={props.match.params.video_id} 
        toggleForm={toggleForm} 
        comment_title={props.comment_title} 
        comment_body={props.comment_body} 
        edit={props.editComment}
        add={commentAdd}
        comment={comment}
      /> : 
        null}
      <Button onClick={() => toggleForm()}>
        {showForm ? "Close Edit" : "Edit Comment"}
      </Button>
    </>
  )
}

export default Comment;