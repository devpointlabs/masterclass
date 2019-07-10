import React, { useState, useEffect, useContext } from "react";
import axios from 'axios'
import ReplyForm from "./ReplyForm";
import { Button, Icon, Comment } from "semantic-ui-react";
import {AuthContext} from '../providers/AuthProvider'

const Reply = (props) => {
  const [reply, setReply] = useState([])
  const [showForm, setShowForm] = useState(false);
  const comment_id = props.comment_id
  const reply_id = props.reply_id
  const reply_body = props.reply_body
  const delete_reply = props.delete_reply
  const editReply = props.editReply
  const addReply = props.addReply
  const showReplies = props.showReplies
  const user_id = props.user_id
  const role = props.role
  const { user, } = useContext(AuthContext)


  useEffect( () => {
    axios.get(`/api/comments/${comment_id}/replies/${reply_id}`)
      .then( res => setReply(res.data))
  }, [])

  const toggleForm = () => {
    setShowForm(!showForm)
  }

  const renderButtons = () => {
    if (user.id === user_id || role === 'teacher') {
      return (
        <>
          <Button.Group>
            <Button size="tiny" icon color='teal' onClick={() => toggleForm()}>
              <Icon name="edit"/>
            </Button>
            <Button size="tiny" icon color='red' onClick={()=> delete_reply(reply_id)}>
              <Icon name='trash'/>
            </Button>
          </Button.Group>
        </>
      )
    }
  }

  return(
    <>
      <hr />
      <Comment.Content>
        {reply_body}
      </Comment.Content>
      <Comment.Content>
      { showForm ? 
          <ReplyForm
            comment_id={comment_id}
            editReply={editReply}
            reply_id={reply_id}
            reply_body={reply_body}
            toggleEdit={toggleForm}
            addReply={addReply}
          /> : 
          null}
      </Comment.Content>
      <Comment.Content>
        <Comment.Action>
          {user && renderButtons()}
        </Comment.Action>
      </Comment.Content>
    </>
  )
}

export default Reply










