import React, { useState, useEffect, } from "react";
import axios from 'axios'
import { Form, } from "semantic-ui-react";
import { Link, } from "react-router-dom";
import { useFormInput, } from "../hooks/useFormInput";

const CommentForm = (props) => {
  const [title, setTitle] = useState();
  const [body, setBody] = useState();

  const video_id = props.video_id
  const lesson_id = props.lesson_id

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
    if (props.comment) {
      axios
        .put(`/api/videos/${props.video_id}/comments/${props.comment_id}`, {
          title: title,
          body: body
        })
        .then(res => {
          props.edit(props.comment_id, res.data)
          props.toggleForm();
        })
      } else {
        axios
        .post(`/api/create-comment`, {
          title: title,
          body: body,
          video_id: props.video_id
        })
        .then(res => {
          props.addComment({title: title, body: body,})
          props.toggleForm();
        });
      };
    }
    
  // const handleSubmit = (e) => {
  //     const video_id = props.video_id
  //   const comment_id = props.comment_id
  //   e.preventDefault();
  //   if (props.comment_id) {
  //     axios
  //       .put(`/api/videos/${video_id}/comments/${comment_id}`, { title: title, body: body })
  //       .then(res => {
  //         props.edit(res.data);
  //         props.toggleForm();
  //       })
  //   } else {
  //     axios
  //       .post(`/api/videos/${video_id}/comments`, { title: title, body: body })
  //       .then(res => {
  //         props.add(res.data);
  //         props.toggleForm();
  //       });
  //   };
  // };

  return ( 
  <Form onSubmit = {handleSubmit}>
    <Form.Group>
    <Form.Input 
      label = "Title"
      placeholder = "Title"
      name = "title"
      required 
      value = {title}
      onChange = {(e) => setTitle(e.target.value)}
    /> 
    <Form.TextArea 
      label = "Body"
      placeholder = "Body"
      name = "body"
      required 
      value = {body}
      onChange = {(e) => setBody(e.target.value)}
    /> 
    </Form.Group> 
    <Form.Button>Submit</Form.Button> 
    </Form>
  );
};

export default CommentForm;