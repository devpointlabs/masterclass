import React, { useState, useEffect, useContext } from "react";
import axios from 'axios'
import {AuthContext} from '../providers/AuthProvider'
import { Form, } from "semantic-ui-react";

const ReplyForm = (props) =>{
  const [body, setBody] = useState();
  const {user } = useContext(AuthContext)
  const comment_id = props.comment_id
  const reply_id = props.reply_id

  useEffect( () => {
    if(reply_id){
      setBody(props.reply_body)
    } else {
      setBody("")
    }
  }, []);
  
  const handleSubmit = e => {
    e.preventDefault();
    if (reply_id) {
      return axios.put(`/api/comments/${comment_id}/replies/${reply_id}`, {body: body
      })
        .then(res => {
          props.editReply(reply_id, res.data)
          props.toggleEdit()
        })
    } 
    else {
      axios.post(`/api/comments/${comment_id}/replies`, {body: body, comment_id: comment_id})
      .then(res => {
        props.addReply(res.data)
        props.toggleReplyForm()
      })
    };
  };
  
  return(<>
    <Form onSubmit = {handleSubmit}>
      <Form.TextArea
      label = "Reply"
      placeholder = "Reply..."
      name = "body"
      required
      value = {body}
      onChange = {(e) => setBody(e.target.value)}
      />
      <Form.Button>Submit Reply</Form.Button>
    </Form>
    </>
  )


}

export default ReplyForm