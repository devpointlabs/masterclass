import React, { useState, useEffect, useContext, } from 'react';
import axios from 'axios';
import CourseQA from './CourseQA'
import Comments from '../Comments';
import { AuthContext, } from '../../providers/AuthProvider';

const TeachersQAndA = (props) => {
  const [questions, setQuestions] = useState([]);
  const [replies, setReplies] = useState([]);
  const [myCourses, setMyCourses] = useState([]);
  const { user, enrollments, setEnrollments } = useContext(AuthContext);
  const teacherCourses = []

    // axios call to get enrollments
    useEffect(()=>{
      axios.get("/api/my-courses")
        .then(res => {
          setEnrollments(res.data)
        })
    },[])

  

  const renderCourses = (props) =>{
    myCourses.map(e => {
      if (e.role === 'teacher') {
        teacherCourses.push(e)
      }
    })
    return ( teacherCourses.map(c =>(
      <div style={{padding:"15px"}}>
          <h1 style = {{color: "blue"}}>
            {c.title}
          </h1>
            <CourseQA id =  {c.id}/>
      </div>
    )))
  }

  useEffect((e) => {
    axios.get("/api/my-courses")
      .then(res => {
        setMyCourses(res.data)
      })
  }, [])


  return (
    <div>
      <h1>Q & A</h1>
      {renderCourses({...props})}
    </div>
  );
}; 

export default TeachersQAndA;