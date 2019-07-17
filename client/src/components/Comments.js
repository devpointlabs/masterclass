import React, { useState, useEffect, useContext} from "react";
import axios from "axios";
import CommentForm from "./CommentForm"
import {AuthContext} from '../providers/AuthProvider'
import QAndA from './Comment'
import { Icon, Button, Comment, } from "semantic-ui-react";

const QAndAs = (props)=>{
  const [comments, setComments] = useState([])
  const [showForm, setShowForm] = useState(false)
  const {user, } = useContext(AuthContext)

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
      <Comment key={c.id}>
        <QAndA
          video_id={props.video_id}
          comment_id={c.id}
          comment_title={c.title}
          comment_body={c.body}
          comment_rating={c.rating}
          comment_read={c.read}
          delete_comment={deleteComment}
          edit_comment={editComment}
          showComments={showComments}
          user_id = {c.user_id}
          role = {props.role}
        />
      </Comment>
      ))
    )
  }

  return(
    <>
      <div style= {{marginTop: '30px'}}>
        <hr/>
        <h1>Q and A</h1>
        <Button color='teal' onClick={toggle}>
          <Icon name='comment alternate outline'/>
          Ask A Question
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
          null
        }
        <div style={{display:'flex', justifyContent:'flex-start', marginTop:'30px'}}>
          <Comment.Group>
            {showComments()}
          </Comment.Group>
        </div>
      </div>
    </>
  )
}

export default QAndAs;