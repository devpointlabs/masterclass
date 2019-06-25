import React, { useState, useEffect, } from "react";
import axios from "axios";
import { Header, } from "semantic-ui-react";
import { Link, } from "react-router-dom";

const Comment = () => {
  const [comments, setComments] = useState([])

  useEffect( (video_id) => {
    axios.get(`/api/videos/${video_id}/comments`)
      .then( res => { setComments(res.data) } )
  }, [])

  return(
    <>
      <Header textAlign="center">

      </Header>
    </>
  )
};

export default Comment;