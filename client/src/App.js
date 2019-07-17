import React from 'react';
import Home from './components/layout/Home'
import { Container, } from "semantic-ui-react";
import { Switch, Route, } from "react-router-dom";
import MainLogin from "./components/Auth/MainLogin";
import MainRegister from "./components/Auth/MainRegister";
import Course from "./components/Course";
import NoMatch from "./components/layout/NoMatch";
import Video from "./components/Video";
import Lesson from "./components/Lesson";
import Navbar from "./components/layout/Navbar";
import Enrollment from './components/Enrollment'
import FetchUser from "./components/Auth/FetchUser"
import Profile from './components/Profile';
import ProtectedRoute from "./components/Auth/ProtectedRoute";
import TeachersView from "./components/teachers/TeachersView";
import EditForm from "./components/forms/edits/EditForm";
import TeachersQAAccordion from "./components/teachers/TeachersQAAccordion"
import AddCourses from "./components/forms/adds/AddCourses"; 


const App = () => (
  <>
    <Navbar />
    <FetchUser>
      {/* <Container> */}
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/login" component={MainLogin} />
        <Route exact path="/register" component={MainRegister} />
        <ProtectedRoute exact path='/profile' component={Profile} />
        <ProtectedRoute exact path="/courses/:id" component={Course} />
        <Route exact path="/" component={Home} />
        <ProtectedRoute exact path="/teachers/courses" component={TeachersView} />
        <ProtectedRoute exact path="/my-courses" component={Enrollment} />
        <Route exact path="/" />
        <ProtectedRoute exact path="/teachers/QandA" component={TeachersQAAccordion} />
        <ProtectedRoute exact path="/courses/:course_id/manage" component={EditForm}/>
        <ProtectedRoute exact path="/forms/create" component={AddCourses} />
        <ProtectedRoute exact path="/lessons/:id" component={Lesson} />
        <ProtectedRoute exact path="/lessons/:lesson_id/videos/:video_id" component={Video} />
        <Route component={NoMatch} />
      </Switch>
      {/* </Container> */}
    </FetchUser>
  </>
);

export default App;
