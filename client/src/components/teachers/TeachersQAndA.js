import React, { useState, useEffect, useContext, } from 'react';
import axios from 'axios';
import Comments from '../Comments';
import { AuthContext, } from '../../providers/AuthProvider';

const TeachersQAndA = (props) => {
  const [questions, setQuestions] = useState([]);
  const [replies, setReplies] = useState([]);
  const [myCourses, setMyCourses] = useState([]);

  useEffect((e) => {
    axios.get("/api/my-courses")
      .then(res => {
        setMyCourses(res.data)
      })
  }, [])


  return (
    <div>
      Q & A
    </div>
  );
}; 

export default TeachersQAndA;