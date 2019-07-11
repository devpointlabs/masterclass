import React, { useState, useEffect, useContext} from "react";
import axios from "axios";
import {AuthContext} from '../providers/AuthProvider'
import Reply from './Reply'
import ReplyForm from "./ReplyForm"
import { Icon, Button, Comment, } from "semantic-ui-react";

const Replies = (props) => {
  const [replies, setReplies] = useState([])
  const [replyForm, setReplyForm] = useState(false);
  const {user, } = useContext(AuthContext) 
  const role = props.role


  useEffect(()=>{
    const id = props.comment_id
    axios.get(`/api/comments/${id}/replies`)
    .then(res => {
      setReplies(res.data)})
  },[])

  const addReply = (reply) =>{
    setReplies([...replies, reply])
  }

  const editReply = (id, reply) => {
    const editedReply = replies.map(r => {
      if (r.id === id) {
        return reply
      } 
      else {
        return r
      }
    })
    return setReplies(editedReply)
  }
  
  const deleteReply = (r_id) => {
    axios.delete(`/api/comments/${props.comment_id}/replies/${r_id}`)
    .then(res =>{
      setReplies(replies.filter(r => r.id !== r_id))
      })
  }

  const toggleReplyForm = () => {
    setReplyForm(!replyForm)
  }

  const showReplies = () => {
    return (
      replies.map( r => (
      <Comment key={r.id}>
        <Reply
          comment_id={props.comment_id}
          reply_id={r.id}
          reply_body={r.body}
          delete_reply={deleteReply}
          editReply={editReply}
          addReply={addReply}
          showReplies={showReplies}
          user_id={r.user_id}
          role={role}
        />
      </Comment>
      ))
    )
  };

  return (
    <>
      <Comment.Content>
        <Comment.Action>
            <Button size='mini' color='teal' onClick={() => toggleReplyForm()}>
              <Icon name='comment alternate outline'/>
              Reply
            </Button>
        </Comment.Action>
      </Comment.Content>
      <Comment.Content>
        { replyForm ? 
          <ReplyForm
            video_id={props.video_id}
            toggleReplyForm={toggleReplyForm}
            comment_id={props.comment_id}
            addReply = {addReply}
          /> : 
          null
        }
      </Comment.Content>
      {showReplies()}
    </>
  )
}

export default Replies;