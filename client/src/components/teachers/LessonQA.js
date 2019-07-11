import React, { useState, useEffect, useContext, } from "react";
import axios from "axios";
import { List, Header, Segment, Button, Icon } from "semantic-ui-react";
import { Link } from 'react-router-dom'


const LessonQA = (props) =>{
  const [videos, setVideos] = useState([]);
  useEffect(()=>{
    axios.get(`/api/lessons/${props.id}/videos`)
    .then(res => {
      setVideos(res.data);

  })
},[])
// useEffect(()=>{

// },[lessons])

  
 return (

   <div>
    {videos.map(l=>{
      return (

        <div>
       <h3>
         {l.title}
         </h3> 
        {/* <LessonQA id = {l.id}/> */}
      </div>
        )
    })}
  </div>
   ) 

}

export default LessonQA;











