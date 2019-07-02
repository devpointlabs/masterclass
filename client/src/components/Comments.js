import React, { useState, useEffect, } from "react";
import axios from "axios";
import Comment from "./Comment";
import CommentForm from "./CommentForm"
import { Header, Segment, List, Button, } from "semantic-ui-react";
import { Link, } from "react-router-dom";

const Comments = (props) => {
  const [comments, setComments] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const video_id = props.match.params.video_id

  useEffect( () => {
    axios.get(`/api/videos/${video_id}/comments`)
      .then( res => { setComments(res.data) } )
  }, [])
  
  const toggleForm = () => {
    setShowForm(!showForm)
  }
  
  const addComment = (comment) => {
    setComments([...comments, comment])
  };

  const editComment = (id, comment) => {
    const newComment = comments.map(c => {
      if (c.id === id) {
        return comment
      } 
      else {
        return c
      }
    })
    return setComments(newComment)
  }

  const deleteComment = (id) => {
    axios.delete(`/api/videos/${video_id}/comments/${id}`)
      .then( res => {
        setComments(comments.filter( comment => comment.id !== id))
      })
  }

  return(
    <>
      <Button onClick={() => toggleForm()}>
        {showForm ? "Close Form" : "Add Comment"}
      </Button>
      {showForm ? <CommentForm video_id={props.match.params.video_id} lesson_id={props.match.params.lesson_id} toggleForm={toggleForm} addComment={addComment}/> : null}
      {comments.map( comment => (
        <Segment key={comment.id}>
          <Comment {...props}
            video_id={props.video_id} 
            comment_id={comment.id} 
            comment_title={comment.title}
            comment_body={comment.body}
            editComment={editComment}
          />
          <Button onClick={()=> deleteComment(comment.id)}>
            Delete
          </Button>
        </Segment>
      ))}
    </>
  )
};

export default Comments;