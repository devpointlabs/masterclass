import React, { useState, useEffect, useContext } from "react";
import axios from 'axios'
import CommentForm from "./CommentForm";
import Replies from "./Replies"
import styled from 'styled-components';
import ReplyForm from "./ReplyForm"
import { Button, Rating, Icon, Comment, Checkbox, Label } from "semantic-ui-react";
import {AuthContext} from '../providers/AuthProvider'

const defaultImage = "https://png.pngtree.com/svg/20161212/f93e57629c.svg"

const QAndA = (props) => {
  const [comment, setComment] = useState([])
  const [readComment, setReadComment] = useState(false)
  const [showForm, setShowForm] = useState(false);
  const [showReplies, setShowReplies] = useState(false);
  const [userInfo, setUserInfo] = useState([])
  const video_id = props.video_id
  const comment_id = props.comment_id
  const comment_title = props.comment_title
  const comment_body = props.comment_body
  const comment_rating = props.comment_rating
  const delete_comment = props.delete_comment
  const edit_comment = props.edit_comment
  const user_id = props.user_id
  const role = props.role
  const {user, } = useContext(AuthContext)

  useEffect( () => {
    axios.get(`/api/videos/${video_id}/comments/${comment_id}`)
    .then( res => setComment(res.data))
  }, [])

  useEffect( () => {
    let id = comment_id
    axios.get(`/api/user-info/${user_id}/${id}`)
    .then( res => setUserInfo(res.data))
  }, [])

  const toggleForm = () => {
    setShowForm(!showForm)
  }
  const commentRead = () => {
    let id = comment_id
    axios.put(`/api/toggle-read/${id}`)
    setReadComment(true)
  }

  const toggleReplies = () => {
    setShowReplies(!showReplies)
  }
  const renderButtons = () => {
      if (role === 'teacher' && props.comment_read === false && readComment === false) {
        return (
          <Checkbox label="Comment has been read" onClick={() => commentRead()} />
          )
      }

    if (user.id === user_id || role === 'teacher'){
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

  return (
    <>
      <hr/>
      <Comment.Content>
        <Rating 
          rating = {comment_rating}
          defaultRating = {5}
          maxRating= {5}
          disabled
          icon='star'
          size= "small"
        />
      </Comment.Content>
      <Comment.Content>
        {console.log(userInfo)}
        {userInfo.map(u => (
          <Label as='a' image>
            <img src={u.user_image || defaultImage} />
            {u.user_name}
          </Label>
        ))}
        <Comment.Content>
          {comment_title}
        </Comment.Content>
        <Comment.Content>
          {comment_body}
        </Comment.Content>
        <div style = {{
          display: 'flex',
          alignSelf:'flex-end',
          marginTop:'10px',
          width: '1000px'
        }}>
        <Comment.Content>
          { showForm ? 
          <CommentForm
            editComment={edit_comment}
            video_id={props.video_id}
            comment_id={comment_id}
            comment_title={comment_title}
            comment_body={comment_body}
            toggleEdit={toggleForm}
          /> : 
          null}
        </Comment.Content>
        </div> 
      </Comment.Content>
      <Comment.Content>
        <Comment.Content>
          <Comment.Action>
            {user && renderButtons()}
          </Comment.Action>
        </Comment.Content>
        <ClickDiv>
          { showReplies ?
            <RepliesClick onClick={() => toggleReplies()}>Hide Replies <Icon name='angle up' /></RepliesClick>
            :
            <RepliesClick onClick={() => toggleReplies()}>Show Replies <Icon name='angle down' /></RepliesClick>
          }
        </ClickDiv>
        <Comment.Group>
          { showReplies ?
            <Replies 
              role={role}
              comment_id={comment_id}
            /> :
            null
          }
        </Comment.Group>
      </Comment.Content>
    </>
  )
}

const ClickDiv = styled.div`
  display: flex;
  justify-content: flex-end;
`

const RepliesClick = styled.p`
  color: blue;
  border-radius: 5px;
  padding-left: 7px;

  &:hover {
    cursor: pointer;
    background: grey ;
    transition: background 0.7s ease;
  } 
`

export default QAndA;