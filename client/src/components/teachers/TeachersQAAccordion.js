import React, { useState, useEffect, useContext, } from 'react';
import axios from 'axios';
import { AuthContext, } from '../../providers/AuthProvider';
import { Accordion, Container, } from 'semantic-ui-react';
import { Link } from 'react-router-dom';


const TeachersQAAccordion = (props) => {
  const [myQAs, setMyQAs] = useState([]);
  const { enrollments, setEnrollments, } = useContext(AuthContext);

  useEffect(()=>{
    axios.get("/api/my-courses")
      .then(res => {
        setEnrollments(res.data)
      })
    },[])
  
  useEffect(() => {
    axios.get("/api/teacher-courses")
      .then(res => {
        setMyQAs(res.data)
      })
    }, [enrollments])

  const videoPanels = (id) => {
    let videoArray = []
    let videoArray2 = []
    myQAs.map(v => {
      let videoObject = { key: v.video_id, title: 
        <Accordion.Title as={Container}>
          <Link to = {`/lessons/${v.lesson_id}/videos/${v.video_id}`}>
            {v.video_title}
          </Link>
        </Accordion.Title>
      }
      if (id === v.v_lesson_id) {
        if (videoArray.includes(videoObject.key)===false) {
          {
            videoArray.push(videoObject.key)
            videoArray2.push(videoObject)
          }
        }
      }
    })
    return (
      videoArray2
    )
  };

  const videoContent = (id) => {
    let complete = false
    return myQAs.map(v => {
      if (id === v.video_id && complete === false) {
        complete = true
        return (
          <div>
            Here Are Your Videos
            <Accordion.Accordion panels={videoPanels(v.v_lesson_id)} />
          </div>
        )
      }
    })
  }
  
  const lessonPanels = (id) => {
    let lessonArray = []
    let lessonArray2 = []
    myQAs.map(l => {
      let lessonObject = { key: l.lesson_id, title: l.lesson_name, content: { content: videoContent(l.video_id) } }
      if (id === l.l_course_id) {
        if (lessonArray.includes(lessonObject.key)===false) {
          {
            lessonArray.push(lessonObject.key)
            lessonArray2.push(lessonObject)
          }
        }
      }
    })
    return (
      lessonArray2
    )
  };

  const lessonContent = (id) => {
    let complete = false
    return myQAs.map(l => {
      if (id === l.lesson_id && complete === false) {
        complete = true
        return (
          <div>
            Here Are Your Lessons
            <Accordion.Accordion panels={lessonPanels(l.l_course_id)} />
          </div>
        )
      }
    })
  }
  
  const coursePanels = () => {
    let courseArray = []
    let courseArray2 =  []
    myQAs.map(c => {
      let courseObject = { key: c.c_id, title: c.c_title, content: { content: lessonContent(c.lesson_id)} }
      if (courseArray.includes(courseObject.key)===false) {
        {
          courseArray.push(courseObject.key)
          courseArray2.push(courseObject)
        } 
      }
    })
    return (
      courseArray2
    )
  }

  const CourseContent = (
    <div>
      Here Are Your Courses
      <Accordion.Accordion panels={coursePanels()} />
    </div>
  )
  
  const rootPanels = [
    { key: 1, title: 'Courses', content: { content: CourseContent } },
  ];
  
  return (
    <>
      <Accordion defaultActiveIndex={0} panels={rootPanels} styled />
    </>
  )
}

export default TeachersQAAccordion;
