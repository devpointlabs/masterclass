import React, { useState, } from "react";
import { AuthConsumer, } from "../../providers/AuthProvider";
import { Menu, Popup, Image, Container, Responsive, Header } from "semantic-ui-react";
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
        
              <>
              <NavMenuItem
                name="Teachers"
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
              </NavMenuItem>
              <NavMenuItem
                active={props.location.pathname === "/my-courses"}>
                <NavLink to="/my-courses"
                exact
                activeStyle={styles.active}
                >
                  <h3>
                  My Enrolled Courses
                  </h3>
                </NavLink>
              </NavMenuItem>
            </>
            
              <NavMenuItem
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
              </NavMenuItem>
            <NavMenuItem
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
            </NavMenuItem>
            <NavMenuItem
            header as = "h3"
            name="Logout"
            onClick={() => handleLogout(props.history)} >
              <NavLink>

            <h3>
              Logout
            </h3>
              </NavLink>
          </NavMenuItem>
        </NavRight>
      );
    } else {
      return (
        <NavRight>
            <NavMenuItem
              active={props.location.pathname === "/login"}>
                <NavLink to="/login">
                  <h3>
                    Login
                  </h3>
                </NavLink>
            </NavMenuItem>
            <NavMenuItem
              active={props.location.pathname === "/register"}>
                <NavLink to="/register">
                  <h3>
                    Register
                  </h3>
              </NavLink>
            </NavMenuItem>
        </NavRight>
      );
    };
  };

  return (
    <AuthConsumer>
      {authProviderValueObject =>
        <StyledDiv>
          <ContainerDiv>
            <div style={{display:"flex", padding: '18px'}}>

          <Link to="/">
            <Image
              size="mini"
              src={require('../Images/logo-white.svg')}
              alternate="Home"
              style={{display: "inline", marginLeft: ".8rem"}}
              />
          </Link>
              <div style ={{ marginLeft: '10px'}}>

             <Search {...props} /> 
              </div>
              </div>
          </ContainerDiv>
          {rightNavItems(authProviderValueObject)}
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
    float: left;

`


const NavRight = styled.ul`
    display:flex;
    justify-content: space-between;
    list-style: none;
    float: right;
`

const StyledLi = styled.li`
      float: left;

`

const StyledLink = styled(Link)`
   display: block;
    padding: 20px;
    text-align: center;
`
const NavMenuItem = styled(Menu.Item)`
  padding: 15px;
  color: #ffffff;
  text-decoration: none;
`
export default withRouter(Navbar);
