import React, { useState, useEffect, } from "react";
import axios from "axios";
import { Header, Segment, List,  } from "semantic-ui-react";
import { Link, } from "react-router-dom";

const Comments = (props) => {
  const [comments, setComments] = useState([])

  useEffect( () => {
    const video_id = props.match.params.video_id
    axios.get(`/api/videos/${video_id}/comments`)
      .then( res => { setComments(res.data) } )
  }, [])


  return(
    <>
      {comments.map( comment => (
        <Segment key={comment.id}>
          <Header textAlign="center">{comment.title}</Header>
          <p>{comment.body}</p>
        </Segment>
      ))}
    </>
  )
};

export default Comments;