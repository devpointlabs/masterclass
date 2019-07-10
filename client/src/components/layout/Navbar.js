import React, { useState, } from "react";
import { AuthConsumer, } from "../../providers/AuthProvider";
import { Menu, Popup } from "semantic-ui-react";
import { Link, withRouter, } from "react-router-dom";


const Navbar = (props) => {
  const [toggleButton, setToggleButton] = useState(true); 

  const rightNavItems = ({ user, handleLogout }) => {
    if (user) {
      return (
        <Menu.Menu position="right">
          {toggleButton ?
            <>
              <Popup content="Switch to the teacher view here - get back to the courses you're teaching." trigger={
                  <Menu.Item
                    name="Teachers"
                    active={props.location.pathname === "/teachers/courses"}
                    onClick={() => setToggleButton(!toggleButton)}
                    link href = "/teachers/courses"
                  />} />
                <Menu.Item
                  name="My Courses"
                  active={props.location.pathname === "/my-courses"}
                  link href = '/my-courses'
                />
            </>
            :
            <Popup content="Switch to the student view here - get back to the courses available." trigger={
                <Menu.Item
                  name="Students"
                  active={props.location.pathname === "/"}
                  onClick={() => setToggleButton(!toggleButton)}
                  link href = "/"
                />
              } />

          }
            <Menu.Item
              name="My Profile"
              active={props.location.pathname === "/profile"}
              link href = "/profile"
            />
          <Menu.Item
            name="Logout"
            onClick={() => handleLogout(props.history)}
          />
        </Menu.Menu>
      );
    } else {
      return (
        <Menu.Menu position="right">
            <Menu.Item
              name="Login"
              active={props.location.pathname === "/login"}
              link href = "/login"
            />
            <Menu.Item
              name="Register"
              active={props.location.pathname === "/register"}
              link href = "/register"
            />
        </Menu.Menu>
      );
    };
  };

  return (
    <AuthConsumer>
      {authProviderValueObject =>
        <Menu inverted pointing>
          <Link to="/">
            <img
              src={require('../Images/LogoBlack.png')}
              alternate="Home"
              style={{ height: "65px", width: "79px" }}
            />

            {/* <Menu.Item
              name="Home"
              active={props.location.pathname === "/"}
            /> */}
          </Link>
          {rightNavItems(authProviderValueObject)}
        </Menu>
      }
    </AuthConsumer >
  );
};

export default withRouter(Navbar);
