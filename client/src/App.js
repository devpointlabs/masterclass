import React from 'react';
import Home from './components/layout/Home'
import { Container, } from "semantic-ui-react";
import { Switch, Route, } from "react-router-dom";
import MainLogin from "./components/auth/MainLogin";
import MainRegister from "./components/auth/MainRegister";
import Course from "./components/Course";
import NoMatch from "./components/layout/NoMatch";
import Video from "./components/Video";
import Lesson from "./components/Lesson";
import Navbar from "./components/layout/Navbar";
// import Courses from "./components/Courses";
import Enrollment from './components/Enrollment'
import FetchUser from "./components/auth/FetchUser"
import MainForm from './components/forms/main/LessonForm';
import Profile from './components/Profile';
import ProtectedRoute from "./components/auth/ProtectedRoute";
import TeachersView from "./components/teachers/TeachersView";
import EditForm from "./components/forms/edits/EditForm";
import TeachersQAndA from "./components/teachers/TeachersQAndA";


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
        <Route exact path="/courses/:id" component={Course} />
        <Route exact path="/" component={Home} />
        <Route exact path="/teachers/courses" component={TeachersView} />
        <Route exact path="/my-courses" component={Enrollment} />
        {/* <Route exact path="/:course_id/lesson_form/:lesson_id/edit" component={LessonForm}/> */}
        <Route exact path="/" />
        <Route exact path="/teachers/QandA" component={TeachersQAndA} />
        <Route exact path="/courses/:course_id/manage" component={EditForm}/>
        <Route exact path="/forms/create" component={MainForm} />
        <Route exact path="/lessons/:id" component={Lesson} />
        <Route exact path="/lessons/:lesson_id/edit" component={MainForm} />
        <Route exact path="/lessons/:lesson_id/videos/:video_id" component={Video} />
        <Route component={NoMatch} />
      </Switch>
      {/* </Container> */}
    </FetchUser>
  </>
);

export default App;
