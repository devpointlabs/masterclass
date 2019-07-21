import React, { useState, useEffect, useContext } from "react";
import axios from 'axios'
import ReplyForm from "./ReplyForm";
import { Button, Icon, Comment, Label } from "semantic-ui-react";
import {AuthContext} from '../providers/AuthProvider'

const defaultImage = "https://png.pngtree.com/svg/20161212/f93e57629c.svg"

const Reply = (props) => {
  const [reply, setReply] = useState([])
  const [showForm, setShowForm] = useState(false);
  const [userInfo, setUserInfo] = useState([])
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

  useEffect( () => {
    let id = reply_id
    axios.get(`/api/reply-user-info/${user_id}/${id}`)
    .then( res => setUserInfo(res.data))
  }, [])

  const toggleForm = () => {
    setShowForm(!showForm)
  }

  const renderButtons = () => {
    if (user.id === user_id) {
      return (
        <>
          <Button.Group size="mini">
            <Button size="mini" icon onClick={() => toggleForm()}>
              Edit
              <Icon name="edit"/>
            </Button>
            <Button.Or />
            <Button size="mini" icon onClick={()=> delete_reply(reply_id)}>
              Delete
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
        {userInfo.map(u => (
          <Label as='a' image>
            <img src={u.user_image || defaultImage} />
            {u.user_name}
          </Label>
        ))}
      </Comment.Content>
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










