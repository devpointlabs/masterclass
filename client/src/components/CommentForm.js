import React, { useState, useEffect, } from "react";
import axios from 'axios'
import { Form, } from "semantic-ui-react";

const CommentForm = (props) => {
  const [title, setTitle] = useState();
  const [body, setBody] = useState();

  const video_id = props.video_id
  const comment_id = props.comment_id

  useEffect( () => {
    if(props.comment_id){
      setTitle(props.comment_title)
      setBody(props.comment_body)
    } else {
      setTitle("")
      setBody("")
    }
  }, []);
  
  const handleSubmit = e => {
    e.preventDefault();
    if (comment_id) {
      return axios.put(`/api/videos/${video_id}/comments/${comment_id}`, {
        title: title,
        body: body
      })
        .then(res => {
          props.editComment(comment_id, res.data)
          props.toggleEdit()
        })
    } 
    else {
      axios.post(`/api/videos/${video_id}/comments`, {title: title, body: body, video_id:video_id})
      .then(res => {
        props.addComment(res.data)
        props.toggleForm()
      })
    };
  };

    

  return ( 
  <Form onSubmit = {handleSubmit}>
    <Form.Group>
    <Form.Input 
      label = "Title"
      placeholder = "Question Title"
      name = "title"
      required 
      value = {title}
      onChange = {(e) => setTitle(e.target.value)}
    /> 
    <Form.TextArea 
      label = "Body"
      placeholder = "Question"
      name = "body"
      required 
      value = {body}
      onChange = {(e) => setBody(e.target.value)}
    /> 
    </Form.Group> 
    <Form.Button>Submit Question</Form.Button> 
    </Form>
  );
};

export default CommentForm;