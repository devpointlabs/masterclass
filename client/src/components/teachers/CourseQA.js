import React, { useState, useEffect, useContext, } from "react";
import axios from "axios";
import LessonQA from './LessonQA'
import { List, Header, Segment, Button, Icon } from "semantic-ui-react";
import { Link } from 'react-router-dom'


const CourseQA = (props) =>{
  const [lessons, setLessons] = useState([]);
  useEffect(()=>{
    axios.get(`/api/courses/${props.id}/lessons`)
    .then(res => {
      setLessons(res.data);

  })
},[])
useEffect(()=>{

},[lessons])

  
 return (

   <div>
    {lessons.map(l=>{
      return (

        <div>
          <ol>

        <h2>

        {l.name}
        </h2>
        <LessonQA id = {l.id}/>
          </ol>
      </div>
        )
    })}
  </div>
   ) 

}

export default CourseQA;











