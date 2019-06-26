import React from 'react';
import Home from './components/layout/Home'
import { Container, } from "semantic-ui-react";
import { Switch, Route, } from "react-router-dom";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import Course from "./components/Course";
import NoMatch from "./components/layout/NoMatch";
import Videos from "./components/Videos";
import Video from "./components/Video";
import Comments from "./components/Comments";
import Navbar from "./components/layout/Navbar";
// import Courses from "./components/Courses";
import Enrollment from './components/Enrollment'
import FetchUser from "./components/auth/FetchUser"
// import ProtectedRoute from "./components/ProtectedRoute";


const App = () => (
  <>
    <Navbar />
    <FetchUser>
      <Container>
        <Switch>
          {/* <ProtectedRoute exact path="/" component={Home} /> */}
          <Route exact path="/courses/:id" component={Course} />
          <Route exact path="/" component={Home} />
          <Route exact path="/my-courses" component={Enrollment} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/register" component={Register} />
          <Route exact path="/lessons/:lesson_id/videos" component={Videos} />
          <Route exact path="/lessons/:lesson_id/videos/:video_id" component={Video} />
          <Route component={NoMatch} />
        </Switch>
      </Container>
    </FetchUser>
  </>
);

export default App;
