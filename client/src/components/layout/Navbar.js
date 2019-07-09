import React, {useState, } from "react";
import { AuthConsumer, } from "../../providers/AuthProvider";
import { Menu, Popup } from "semantic-ui-react";
import { Link, withRouter, } from "react-router-dom";

const Navbar = (props) => {
  const [toggleButton, setToggleButton] = useState(false); 

  const rightNavItems = ({ user, handleLogout }) => {
    if (user) {
      return (
        <Menu.Menu position="right">
          { toggleButton ? 
          <>
          <Popup content="Switch to the teacher view here - get back to the courses you're teaching." trigger={
            <Link to="/teachers/courses">
             <Menu.Item
               name="Teachers"
               active={props.location.pathname === "/teachers/courses"}
               onClick={() => setToggleButton(!toggleButton)}
             />
           </Link> }/> 
            <Link to="/my-courses">
            <Menu.Item
              name="My Courses"
              active={props.location.pathname === "/my-courses"}
            />
            </Link>
            </>
           : 
           <Popup content="Switch to the student view here - get back to the courses available." trigger={
            <Link to="/">
             <Menu.Item
               name="Students"
               active={props.location.pathname === "/"}
               onClick={() => setToggleButton(!toggleButton)}
             />
          </Link> }/>
         
        }
          <Link to="/profile">
            <Menu.Item
              name="My Profile"
              active={props.location.pathname === "/profile"}

            />

          </Link>
          <Menu.Item
            name="Logout"
            onClick={() => handleLogout(props.history)}
          />
        </Menu.Menu>
      );
    } else {
      return (
        <Menu.Menu position="right">
          <Link to="/login">
            <Menu.Item
              name="Login"
              active={props.location.pathname === "/login"}
            />
          </Link>
          <Link to="/register">
            <Menu.Item
              name="Register"
              active={props.location.pathname === "/register"}
            />
          </Link>
        </Menu.Menu>
      );
    };
  };

  return (
    <AuthConsumer>
      {authProviderValueObject =>
        <Menu pointing secondary>
          <Link to="/">
            <Menu.Item
              name="Home"
              active={props.location.pathname === "/"}
            />
          </Link>
          {rightNavItems(authProviderValueObject)}
        </Menu>
      }
    </AuthConsumer>
  );
};

export default withRouter(Navbar);
