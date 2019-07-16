import React, {useState} from 'react'
import { Header, Icon, Image, Button, Menu, Container, Segment, Sidebar, SidebarPushable, Breadcrumb } from 'semantic-ui-react'
import EditCourseForm from './EditCourseForm'; 
import styled from 'styled-components';
import EditLessonForm from './EditLessonForm'; 
import EditVideoForm from './EditVideoForm'; 
// TODO - get rid of menu? Use breadcrumb 

const EditForm = (props) => {
  const [step, setStep] = useState(1); 
  const [courseId, setCourseId] = useState(); 
  const [lessonId, setLessonId] = useState(); 

// get the id for the course
const getCourseId = (id) => {
  setCourseId(id); 
}

// get the id for the lesson 
const getLessonId = (id) => {
  setLessonId(id)
}

// Render Form Pages 
  const renderForms = (step) => {
    switch(step) {
      case 1: 
      return (
        <EditCourseForm {...props} getCourseId={getCourseId} />
      )
      case 2: 
      return (
        <EditLessonForm {...props} courseId={courseId} getLessonId={getLessonId}/>
      )
      // case 3: 
      // return (
      //   <EditVideoForm {...props} lessonId={lessonId} />
      // )
      // case 4: 
      // return(
      //   <Success />
      // )
    }
  }


  
  return (
    <>
    {/* GO BACK BUTTON - BREADCRUMB */}
     <Breadcrumb size="large">
        <Breadcrumb.Section link onClick={() => props.history.goBack("/teachers/courses")}>Courses</Breadcrumb.Section>
        <Breadcrumb.Divider icon='right chevron' />
        <Breadcrumb.Section active>Manage Courses</Breadcrumb.Section>
      </Breadcrumb>
    <Sidebar.Pushable as={Container}>
    <Sidebar as={Menu} borderless icon='labeled' vertical visible width='thin'>
      <br/>
      <Header as="h4" textAlign="left">Plan your course</Header>
      <Menu.Item as='a' fitted="vertically" onClick={() => setStep(1)}>
        Manage Course 
      </Menu.Item>
      <br/>
      <Header as="h4" textAlign="left">Manage your content</Header>
      <Menu.Item  as='a' fitted="vertically" onClick={() => setStep(2)}>
        Manage lessons
      </Menu.Item>
      {/* <Menu.Item as='a' fitted="vertically" style={{marginTop: "10px"}} onClick={() => setStep(3)}>
        Manage videos
      </Menu.Item> */}
    </Sidebar>

    <Sidebar.Pusher>
     
      <Segment compact={true} style={{height: "500px"}} >
        {/* Renders forms */}
        {renderForms(step)}
      </Segment>
    </Sidebar.Pusher>
  </Sidebar.Pushable>
  </>
  )
}

export default EditForm
