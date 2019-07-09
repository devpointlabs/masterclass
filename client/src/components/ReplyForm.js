import React, { useState, useEffect, useContext } from "react";
import axios from 'axios'
import {AuthContext} from '../providers/AuthProvider'
import { Form, } from "semantic-ui-react";

const ReplyForm = (props) =>{
  const [body, setBody] = useState("");

  const {user } = useContext(AuthContext)

  
  const video_id = props.video_id
  const comment_id = props.comment_id
  const add = props.addReplies

  const handleSubmit = e =>{
    e.preventDefault()
    axios.post(`/api/comments/${comment_id}/replies`, {body: body, comment_id: comment_id,})
    .then(res=>{
      props.addReplies(res.data)
      props.toggleReplyForm()
    })
   

  }
  
  return(<>
    <Form onSubmit = {handleSubmit}>
      <Form.Input
      label = "Reply"
      placeholder = "Reply"
      name = "body"
      required
      value = {body}
      onChange = {e => setBody(e.target.value)}
      />
      <Form.Button>Add</Form.Button>
    </Form>
    </>
  )


}

export default ReplyForm