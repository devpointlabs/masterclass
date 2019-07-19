import React, {Suspense, lazy} from 'react';
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
import SearchPage from "./components/SearchPage"; 
import VideoView from "./components/view_pages/VideoView";
// const TeachersQAAccordion = lazy(()=> import('./components/teachers/TeachersQAAccordion'))
import TeacherQA from './components/teachers/TeacherQA'


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
        <Route exact path="/search" component={SearchPage}/>
        <ProtectedRoute exact path="/course-video-view/:id" component={VideoView} />
        <ProtectedRoute exact path="/teachers/courses" component={TeachersView} />
        <ProtectedRoute exact path="/my-courses" component={Enrollment} />
        <ProtectedRoute exact path="/teachers/QandA" component={TeacherQA} />
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
