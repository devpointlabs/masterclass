import React, { useState, useEffect, useContext } from "react";
import { Header, Card, Container, Button, Icon, Divider, Segment } from "semantic-ui-react";
import { Link, } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../../providers/AuthProvider";
import '../../Styles/ManageCourse.css'
import styled from 'styled-components'; 

const TeachersCourses = (props) => {
  const { user, enrollments, setEnrollments } = useContext(AuthContext);
  const [courses, setCourses] = useState();
  // axios call to get enrollments
  useEffect(() => {
    axios.get("/api/my-courses")
      .then(res => {
        setEnrollments(res.data)
      })
  }, [])

  const removeCourse = (id) => {
    axios.delete(`/api/my-courses/${id}`)
      .then(res => {
        setEnrollments(enrollments.filter(e => e.course_id !== id))
      })
  }


  const renderEnrollments = () => {
    let roles = []
    enrollments.map(e => {
      if (e.role === 'teacher') {
        roles.push(e)
      }
    })

    return (roles.map(e => (
      <>
<div className="container" key={e.course_id} >
<div style={{display:"flex", alignContent: "center", justifyContent:"space-between" }}>

  <h3 className="title">{e.category}</h3>
 
  {(e.role === 'teacher') && <Button size="tiny" color="red" icon animated onClick={() => removeCourse(e.course_id)}>
             <Button.Content visible>Delete</Button.Content>
             <Button.Content hidden>
               <Icon name="trash" />
             </Button.Content>
           </Button>}
           </div>
    <p className="paragraph"><div dangerouslySetInnerHTML={{__html: e.overview}}></div></p>
  <div className="content">
    <Link className="a" to={{ pathname: `/courses/${e.course_id}/manage` }}>
      <div className="content-overlay"></div>
      <img className="content-image" src={e.image}/>
      <div class="content-details fadeIn-top">
        <h3>Manage/Edit Course</h3>
      </div>
    </Link>
  </div>
</div>
      </>
    ))
    )
  }


  return (
    <CourseContainer style={{background: "purple"}}>
      {/* <div style={{ display: "flex", flexDirection: "column" }}> */}

        {enrollments ?
          renderEnrollments() :
          <>
            <Segment>
              <h1>You have no courses</h1>
            </Segment>
          </>
        }
      {/* </div> */}
    </CourseContainer>

  )

};

const CourseContainer = styled.div`
background: #323232; 
width: 100% important!; 
display: "flex"; 
justify-content: center; 
/* align-content: center; 
 */
 align-items: center; 
/* height: 100vh;  */
`


export default TeachersCourses;