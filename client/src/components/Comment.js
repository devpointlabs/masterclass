import React, { useState, useEffect, useContext } from "react";
import axios from 'axios'
import CommentForm from "./CommentForm";
import QAndAs from "./Comments"
import { Button, Rating, Icon, Comment } from "semantic-ui-react";
import {AuthContext} from '../providers/AuthProvider'

const QAndA = (props) => {
  const [comment, setComment] = useState([])
  const [showForm, setShowForm] = useState(false);
  const [replies, setReplies] = useState([])
  const [replyForm, setReplyForm] = useState(false);
  const video_id = props.video_id
  const comment_id = props.comment_id
  const comment_title = props.comment_title
  const comment_body = props.comment_body
  const comment_rating = props.comment_rating
  const delete_comment = props.delete_comment
  const edit_comment = props.edit_comment
  const user_id = props.user_id
  const {user, } = useContext(AuthContext)


  useEffect( () => {
    axios.get(`/api/videos/${video_id}/comments/${comment_id}`)
      .then( res => setComment(res.data))
  }, [])

  const toggleForm = () => {
    setShowForm(!showForm)
  }

  const renderButtons = () =>{
    if (user.id === user_id){
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
      </>)
    }
  }
  const toggleReplyForm = () => {
    setReplyForm(!replyForm)
  }

  const addReplies = (reply) => {
    setReplies([...replies, reply])
  }

  const showReplies = () => {
    return (
      replies.map( r => (
      <Comment key={r.id}>
        <QAndA
          video_id={props.video_id}
          comment_id={r.id}
          comment_title={r.title}
          comment_body={r.body}
          comment_rating={r.rating}
          delete_comment={props.deleteComment}
          edit_comment={props.editComment}
          addComment={props.addComment}
          showComments={props.showComments}
        />
      </Comment>
      )))
  };

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
          size= "massive"
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
            <CommentForm
              showComments={props.showComments}
              comments={props.comments}
              setComments={props.setComments}
              addReplies={addReplies}
              replies={replies}
              setReplies={setReplies}
              video_id={props.video_id}
              toggleReplyForm={toggleReplyForm}
              replyForm={replyForm}
            /> : 
            null}
        </Comment.Content>
        <Comment.Content>
          <Comment.Action>
            {renderButtons()}
          </Comment.Action>
        </Comment.Content>
        <Comment.Group>
          {showReplies()}
        </Comment.Group>
      </Comment.Content>
    </>
  )
}

export default QAndA;