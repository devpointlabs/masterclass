import React, {useState, useContext} from 'react'; 
import { Header, Icon, Image, Menu, Segment, Sidebar, Button} from 'semantic-ui-react'
import TeachersCourses from './TeachersCourses';
import {Link} from 'react-router-dom'; 
import { AuthContext } from "../../providers/AuthProvider";


const TeachersView = () => {
  const {user } = useContext(AuthContext)
  const [visible, setVisible] = useState(false);
  
  
  const handleHideClick = () => setVisible(false); 
  const handleShowClick = () => setVisible(true); 
  const handleSidebarHide = () => setVisible(false); 
  return (
    <>
    <Button.Group>
          <Button disabled={visible} onMouseOver={handleShowClick}>
            Show sidebar
          </Button>
          <Button disabled={!visible} onMouseOver={handleHideClick}>
            Hide sidebar
          </Button>
        </Button.Group>

        {/* <Sidebar.Pushable as={Segment}> */}
          <Sidebar
            as={Menu}
            animation='overlay'
            icon='labeled'
            inverted
            onHide={handleSidebarHide}
            vertical
            visible={visible}
            width='thin'
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
            <Menu.Item as='a'>
              <Icon name='settings' />
              Settings
            </Menu.Item>
          </Sidebar>

          <Sidebar.Pusher>
            <Segment basic>
              <Header as='h2'>Courses</Header>
              {user && 
                <Link to="/forms/create">
                    <Button floated="right">
                      Add Courses
                    </Button>
                </Link>
              }
              <br/>
              <br/>
              {/* RENDER TEACHERS COURSES */}
              <TeachersCourses/>
            </Segment>
          </Sidebar.Pusher>
        {/* </Sidebar.Pushable> */}
    </> 
  )
}

export default TeachersView
