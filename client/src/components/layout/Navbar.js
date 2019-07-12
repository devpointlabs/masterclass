import React, { useState, } from "react";
import { AuthConsumer, } from "../../providers/AuthProvider";
import { Menu, Popup } from "semantic-ui-react";
import { NavLink, Link, withRouter, } from "react-router-dom";


const Navbar = (props) => {
  const [toggleButton, setToggleButton] = useState(true); 

  const rightNavItems = ({ user, handleLogout }) => {
    if (user) {
      return (
        <Menu.Menu position="right">
          {/* {toggleButton ? */}
            <>
              {/* <Popup content="Switch to the teacher view here - get back to the courses you're teaching." trigger={ */}
                
                <Menu.Item
                    name="Teachers"
                    // active={props.location.pathname === "/teachers/courses"}
                    onClick={() => setToggleButton(!toggleButton)}
                    >
                <NavLink to="/teachers/courses"
                exact
                activeStyle={styles.active}
                >
                  <h2>

                      Teachers
                  </h2>
                      </NavLink>
                    </Menu.Item>
                {/* } /> */}

                <Menu.Item
                  active={props.location.pathname === "/my-courses"}
                  >
                    <NavLink to="/my-courses"
                    exact
                    activeStyle={styles.active}
                    >
                      <h2>
                      My Courses
                      </h2>
                    </NavLink>
                  </Menu.Item>
            </>
            :
            <Popup content="Switch to the student view here - get back to the courses available." trigger={
              <Menu.Item
                  active={props.location.pathname === "/"}
                  onClick={() => setToggleButton(!toggleButton)}
                  >
                    <NavLink to="/"
                    exact
                    activeStyle={styles.active}
                    >
                      <h2>
                    
                    Students
                    </h2>
                    </NavLink>
              </Menu.Item>
             } />

          }
            <Menu.Item
              name="My Profile"
              active={props.location.pathname === "/profile"}
            >
            <NavLink to="/profile"
            exact
            activeStyle={styles.active}
            >
              <h2>
                    
              My Profile
                    </h2>
            </NavLink>
            </Menu.Item>
          <Menu.Item
            header as = "h2"
            name="Logout"
            onClick={() => handleLogout(props.history)}
          />
        </Menu.Menu>
      );
    } else {
      return (
        <Menu.Menu position="right">
            <Menu.Item
              active={props.location.pathname === "/login"}
            >
              <Link to="/login">
              <h2>
                    
                Login
                    </h2>
              </Link>
            </Menu.Item>
            <Menu.Item
              active={props.location.pathname === "/register"}
            >
              <NavLink to="/register">
              <h2>
                    
            Register
                    </h2>
          </NavLink>
            </Menu.Item>
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

const styles = {
  active: {
    color: 'rgb(189, 122, 235)',
    fontWeight: 'bold',
  }
}
export default withRouter(Navbar);
