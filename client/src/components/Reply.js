import React, { useState, useEffect, useContext } from "react";
import axios from 'axios'
import ReplyForm from "./ReplyForm";
import styled from 'styled-components';
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
              <Icon name="edit" style={{ color: "teal"}}/>
            </Button>
            <Button.Or />
            <Button size="mini" icon onClick={()=> window.confirm("Are you sure you wish to delete your reply?") && delete_reply(reply_id)}>
              <Icon name='trash' style={{ color: "red"}}/>
            </Button>
          </Button.Group>
        </>
      )
    }
  }

  return(
    <div style={{ background: '#636363', padding: '5px', border: '#4f4f4f solid 3px' ,borderRadius: '5px', overflowWrap: 'break-word', width: '100%'}}>
      <CommentContent style={{ display: 'flex', justifyContent: 'space-between'}}>
        {userInfo.map(u => (
          <Label as='a' image>
            <img src={u.user_image || defaultImage} />
            {u.user_name}
          </Label>
        ))}
        <Comment.Action>
          {user && renderButtons()}
        </Comment.Action>
      </CommentContent>
      <CommentContent style={{ color: 'white', padding: '5px' }}>
        <br/>
        {reply_body}
      </CommentContent>
      <CommentContent>
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
      </CommentContent>
    </div>
  )
}

const CommentContent = styled.div`
    position: relative;
    width: 100%;
    max-width: 100%;
    margin: 0px;
    overflow: hidden;
`;

export default Reply










