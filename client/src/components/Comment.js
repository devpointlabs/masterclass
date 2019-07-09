import React, { useState, useEffect, useContext } from "react";
import axios from 'axios'
import CommentForm from "./CommentForm";
import Replies from "./Replies"
import ReplyForm from "./ReplyForm"
import { Button, Rating, Icon, Comment, Header } from "semantic-ui-react";
import {AuthContext} from '../providers/AuthProvider'

const QAndA = (props) => {
  const [comment, setComment] = useState([])
  const [showForm, setShowForm] = useState(false);
  const [replyForm, setReplyForm] = useState(false);
  const [replies, setReplies] = useState([])
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
    axios.get(`/api/comments/${comment_id}/replies`)
      .then(res=> setReplies(res.data))

  }, [])

  const toggleForm = () => {
    setShowForm(!showForm)
  }
  const addReplies = (reply) =>{
    setReplies([...replies, reply])
  }

  const renderButtons = () =>{
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

  const toggleReplyForm = () => {
    setReplyForm(!replyForm)
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
        <Comment.Action>
          <Button color='teal' onClick={() => toggleReplyForm()}>
            <Icon name='comment alternate outline'/>
            Reply
          </Button>
        </Comment.Action>
        <Comment.Content>
          { replyForm ? 
            <ReplyForm
              video_id={props.video_id}
              toggleReplyForm={toggleReplyForm}
              comment_id={comment_id}
              addReplies = {addReplies}
              
            /> : 
            null}
        </Comment.Content>
        <Comment.Content>
          <Comment.Action>
            {user && renderButtons()}
          </Comment.Action>
        </Comment.Content>
        <Comment.Group>
            {replies.map(r=>{
              return(
                <Header key = {r.id}>{r.body}</Header>
              )
            })}
        </Comment.Group>
      </Comment.Content>
    </>
  )
}

export default QAndA;