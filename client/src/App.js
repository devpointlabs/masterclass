import React from 'react';
import Home from './components/layout/Home'
import { Container, } from "semantic-ui-react";
import { Switch, Route, } from "react-router-dom";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import NoMatch from "./components/layout/NoMatch";
import Video from "./components/Video";
import Navbar from "./components/layout/Navbar";
// import Courses from "./components/Courses";
import FetchUser from "./components/auth/FetchUser"
// import ProtectedRoute from "./components/ProtectedRoute";


const App = () => (
  <>
    <Navbar />
    <FetchUser>
      <Container>
        <Switch>
          {/* <ProtectedRoute exact path="/" component={Home} /> */}
          <Route exact path="/home" component={Home} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/register" component={Register} />
          <Route exact path="/video" component={Video} />
          <Route component={NoMatch} />
        </Switch>
      </Container>
    </FetchUser>
  </>
);

export default App;
