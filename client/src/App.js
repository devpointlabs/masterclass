import React from 'react';
import Home from "./components/Home";
import { Container, } from "semantic-ui-react";
import { Switch, Route, } from "react-router-dom";
import Login from "./components/Login";
import Register from "./components/Register";
import NoMatch from "./components/NoMatch";
import Navbar from "./components/Navbar";
// import Courses from "./components/Courses";
// import FetchUser from "./components/FetchUser";
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
          <Route component={NoMatch} />
        </Switch>
      </Container>
    </FetchUser>
  </>
);

export default App;
