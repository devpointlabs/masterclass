import React, { useState, useEffect, } from "react";
import axios from 'axios'
import CommentForm from "./CommentForm";
import QAndAs from "./Comments"
import { Button, Rating, Icon, Comment } from "semantic-ui-react";

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

  useEffect( () => {
    axios.get(`/api/videos/${video_id}/comments/${comment_id}`)
      .then( res => setComment(res.data))
  }, [])

  const toggleForm = () => {
    setShowForm(!showForm)
  }

  const toggleReplyForm = () => {
    setReplyForm(!replyForm)
  }

  const addReplies = (reply) => {
    setReplies([...replies, reply])
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
            <Button.Group>
              <Button size="tiny" icon color='teal' onClick={() => toggleForm()}>
                <Icon name="edit"/>
              </Button>
              <Button size="tiny" icon color='red' onClick={()=> delete_comment(comment_id)}>
                <Icon name='trash'/>
              </Button>
            </Button.Group>
          </Comment.Action>
        </Comment.Content>
        <Comment.Group>
          {replies}
        </Comment.Group>
      </Comment.Content>
    </>
  )
}

export default QAndA;