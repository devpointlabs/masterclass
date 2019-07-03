import React, { useState, useEffect, } from "react";
import axios from "axios";
import CommentForm from "./CommentForm"
import Comment from './Comment'
import { Card, Icon, Button, } from "semantic-ui-react";

const Comments = (props)=>{
  const [comments, setComments] = useState([])
  const [showForm, setShowForm] = useState(false)

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
    setComments([...comments, comment])
  }

  const editComment = (id, comment) => {
    const editedComment = comments.map(c => {
      if (c.id === id) {
        return comment
      } 
      else {
        return c
      }
    })
    return setComments(editedComment)
  }
  
  const deleteComment = (c_id) =>{
    axios.delete(`/api/videos/${props.video_id}/comments/${c_id}`)
    .then(res =>{
      setComments(comments.filter(c => c.id !== c_id))
      })
  }

  const showComments = () => {
    return (
      comments.map( c => (
      <Card key={c.id}>
        <Comment
          video_id={props.video_id}
          comment_id={c.id}
          comment_title={c.title}
          comment_body={c.body}
          comment_rating={c.rating}
          delete_comment={deleteComment}
          edit_comment={editComment}
        />
      </Card>
      )))
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
        { showForm ? 
            <CommentForm
              showComments={showComments}
              comments={comments}
              setComments={setComments}
              addComment={addComment}
              video_id={props.video_id}
              toggleForm={toggle}
            /> : 
            null}
        <div style={{display:'flex', justifyContent:'flex-start', marginTop:'30px'}}>
          <Card.Group itemsPerRow={1}>
            {showComments()}
          </Card.Group>
        </div>
      </div>
    </>
  )
  
}

export default Comments;