import React, { useState, } from "react";
import { AuthConsumer, } from "../../providers/AuthProvider";
import { Menu, Popup, Image, Container } from "semantic-ui-react";
import { NavLink, Link, withRouter, } from "react-router-dom";
import axios from 'axios'; 
import Search from './Search'; 
import styled from 'styled-components'; 


const Navbar = (props) => {
  const [toggleButton, setToggleButton] = useState(true);

  const rightNavItems = ({ user, handleLogout }) => {
    if (user) {
      return (
        <NavRight>
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
                  <h3>
                    Teachers
                  </h3>
                </NavLink>
              </Menu.Item>
              <Menu.Item
                active={props.location.pathname === "/my-courses"}>
                <NavLink to="/my-courses"
                exact
                activeStyle={styles.active}
                >
                  <h3>
                  My Enrolled Courses
                  </h3>
                </NavLink>
              </Menu.Item>
            </>
            {/* <Popup content="Switch to the student view here - get back to the courses available." trigger={ */}
              <Menu.Item
                active={props.location.pathname === "/"}
                onClick={() => setToggleButton(!toggleButton)}
                >
                <NavLink to="/"
                exact
                activeStyle={styles.active}
                >
                  <h3>
                  Students
                  </h3>
                </NavLink>
              </Menu.Item>
            {/* //  } /> */}

          {/* } */}
            <Menu.Item
              name="My Profile"
              active={props.location.pathname === "/profile"}
              >
              <NavLink to="/profile"
              exact
              activeStyle={styles.active}
              >
                <h3>
                My Profile
                </h3>
              </NavLink>
            </Menu.Item>
          <Menu.Item
            header as = "h3"
            name="Logout"
            onClick={() => handleLogout(props.history)}
          />
        </NavRight>
      );
    } else {
      return (
        <NavRight>
            <Menu.Item
              active={props.location.pathname === "/login"}>
                <Link to="/login">
                  <h3>
                    Login
                  </h3>
                </Link>
            </Menu.Item>
            <Menu.Item
              active={props.location.pathname === "/register"}>
                <NavLink to="/register">
                  <h3>
                    Register
                  </h3>
              </NavLink>
            </Menu.Item>
        </NavRight>
      );
    };
  };

  return (
    <AuthConsumer>
      {authProviderValueObject =>
        <StyledDiv>
          <ContainerDiv>
          <Link to="/">
            <Image
              size="mini"
              src={require('../Images/logo-white.svg')}
              alternate="Home"
              style={{display: "inline", paddingTop: "18px", marginLeft: ".8rem"}}
            />
          </Link>
          <NavCenter>
            <Search {...props} />
          </NavCenter>
          {rightNavItems(authProviderValueObject)}
          </ContainerDiv>
        </StyledDiv>
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

const StyledDiv = styled.div`
  /* background-color: white; */
  background: #333;
  color: #fff;
  overflow: auto;
  /* margin: 0; */
  /* padding: .6em 1em; */
`

const ContainerDiv = styled.div`
  margin: auto;
    max-width: 1100px;
    overflow: auto;
    padding: 0 20px;
    font-size: 18px;
`

const NavCenter = styled.div`
  float: center; 
  text-align: center;
`;

const NavRight = styled.ul`
    list-style: none;
    float: right;
`
export default withRouter(Navbar);
