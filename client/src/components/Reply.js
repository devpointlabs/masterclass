import React, { useState, useEffect, useContext } from "react";
import axios from 'axios'
import CommentForm from "./CommentForm";
import Replies from "./Replies"
import { Button, Rating, Icon, Comment } from "semantic-ui-react";
import {AuthContext} from '../providers/AuthProvider'

const Reply = (props) => {
  const [reply, setReply] = useState([])
  const comment_id = props.comment_id
  const reply_id = props.reply_id
  const reply_body = props.reply_body
  const delete_comment = props.deleteReply
  const edit_comment = props.editReply
  const addReply = props.addReply
  const showReplies = props.showReplies
  const user_id = props.user_id
  const { user, } = useContext(AuthContext)


  useEffect( () => {
    axios.get(`/api/comments/${comment_id}/replies/${reply_id}`)
  }, [])

  const renderButtons = () => {
    if (user.id === user_id) {
      return (
        <>
          <Button.Group>
            <Button size="tiny" icon color='teal' onClick={() => toggleForm()}>
              <Icon name="edit"/>
            </Button>
            <Button size="tiny" icon color='red' onClick={()=> delete_comment(comment_id)}>
              <Icon name='trash'/>
            </Button>
          </Button.Group>
        </>
      )
    }
  }

  return(
    <>
      <Comment.Content>

      </Comment.Content>
    </>
  )
}

export default Reply










