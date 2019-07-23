import React, {useState, useContext} from 'react'; 
import { Header, Icon, Image, Menu, Segment, Sidebar, Button} from 'semantic-ui-react'
import TeachersCourses from './TeachersCourses';
import {Link} from 'react-router-dom'; 
import { AuthContext } from "../../providers/AuthProvider";
import styled from 'styled-components';



const TeachersView = () => {
  const {user } = useContext(AuthContext)
  const [visible, setVisible] = useState(false);
  
  
  const handleHideClick = () => setVisible(false); 
  const handleShowClick = () => setVisible(true); 
  const handleSidebarHide = () => setVisible(false); 
  return (
    <>
    <Container>
    <Button.Group >
          <Button disabled={visible} onMouseOver={handleShowClick}>
            Show sidebar
          </Button>
          <Button disabled={!visible} onMouseOver={handleHideClick}>
            Hide sidebar
          </Button>
        </Button.Group>
    </Container>

        <Sidebar.Pushable as={Segment} style={sidebarStyle}>
          <Sidebar
            as={Menu}
            animation='overlay'
            icon='labeled'
            inverted
            onHide={handleSidebarHide}
            vertical
            visible={visible}
            width='thin'
            style={sidebarStyle}
            
            
          >
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
          </Sidebar>

            <Segment basic>
          <Sidebar.Pusher style={sidebarStyle}>
              {/* <br/>
              <br/> */}
              {/* RENDER TEACHERS COURSES */}
              <TeachersCourses/>
          </Sidebar.Pusher>
            </Segment>
        </Sidebar.Pushable>
    </> 
  )
}

const StyledSeg=  styled.div`
  margin-top:20px;
`

const Container = styled.div`
  height: 100%; 
  width: 100%; 
  /* background: "#323232" */
`

const sidebarStyle = {
  margin: "0px !important", 
  padding: "0px !important",
  // background: "#323232",
}

export default TeachersView
