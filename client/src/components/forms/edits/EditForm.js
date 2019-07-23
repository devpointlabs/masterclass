import React, {useState} from 'react'
import { Header, Icon, Image, Button, Menu, Container, Segment, Sidebar, SidebarPushable, Breadcrumb } from 'semantic-ui-react'
import EditCourseForm from './EditCourseForm'; 
import styled from 'styled-components';
import EditLessonForm from './EditLessonForm';
import {Link} from 'react-router-dom' 
import EditVideoForm from './EditVideoForm'; 
// TODO - get rid of menu? Use breadcrumb 

const EditForm = (props) => {
  const [step, setStep] = useState(1); 
  const [courseId, setCourseId] = useState(""); 
  const [lessonId, setLessonId] = useState(""); 
  const [visible, setVisible] = useState(false);


// get the id for the course
const getCourseId = (id) => {
  setCourseId(id); 
}

// get the id for the lesson 
const getLessonId = (id) => {
  setLessonId(id)
}
const handleHideClick = () => setVisible(false); 
  const handleShowClick = () => setVisible(true); 
  const handleSidebarHide = () => setVisible(false);

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
    }
  }


  
  return (
    <>
    {/* GO BACK BUTTON - BREADCRUMB */}
     {/* <Breadcrumb size="large">
        <Breadcrumb.Section link onClick={() => props.history.goBack("/teachers/courses")}>Courses</Breadcrumb.Section>
        <Breadcrumb.Divider icon='right chevron' />
        <Breadcrumb.Section active>Manage Courses</Breadcrumb.Section>
      </Breadcrumb> */}
       <Button.Group>
          <Button disabled={visible} onMouseOver={handleShowClick}>
            Show sidebar
          </Button>
          <Button disabled={!visible} onMouseOver={handleHideClick}>
            Hide sidebar
          </Button>
        </Button.Group>
    <Sidebar.Pushable as={Segment}>
    <Sidebar
     as={Menu} 
    animation='overlay'
    borderless 
    inverted
    icon='labeled' 
    onHide={handleSidebarHide}
    vertical 
    visible ={visible}
    width='thin'>
      <Link to="/teachers/courses">
            <Menu.Item as='a'>
              <Icon name='file video outline' />
              Courses
            </Menu.Item>
            </Link>
            <Link to="/teachers/QandA">
            <Menu.Item as='a'>
              <Icon name='comments outline' />
              Q&A
            </Menu.Item>
            </Link>
            <Link to="/forms/create">
                <Menu.Item as='a'>
                  <Icon name='plus square outline' />
                   New Course
                </Menu.Item>
            </Link>
            {/* <Menu.Item as='a' fitted="vertically" onClick={() => setStep(1)}>
        Manage Course 
      </Menu.Item> */}
      {/* <Header as="h4" textAlign="left">Manage your content</Header> */}
      <br/>
      <Menu.Item  as='a' fitted="vertically" onClick={() => setStep(2)}>
        <Icon name="wrench"/>
        Manage lessons
      </Menu.Item>
   
    </Sidebar> 

     <Sidebar.Pusher>
     
      <MySegment  >
        {/* Renders forms */}
        <div style={{padding: "25px"}}>

        {renderForms(step)}
        </div>
      </MySegment>
    </Sidebar.Pusher>
  </Sidebar.Pushable>
  </>
  )
}
const MySegment = styled.div`
  height: 100vh;
  width: 100%;
  // color: white;
  background-color: blue
`

export default EditForm
