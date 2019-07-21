import React, { useState, } from "react";
import { AuthConsumer, } from "../../providers/AuthProvider";
import { Menu, Image, } from "semantic-ui-react";
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
                <StyledNavLink to="/teachers/courses"
                exact
                activeStyle={styles.active}
                >
                  <h3>
                    Teachers
                  </h3>
                </StyledNavLink>
              </NavMenuItem>
              <NavMenuItem
                active={props.location.pathname === "/my-courses"}>
                <StyledNavLink to="/my-courses"
                exact
                activeStyle={styles.active}
                >
                  <h3>
                  My Enrolled Courses
                  </h3>
                </StyledNavLink>
              </NavMenuItem>
            </>
            
              <NavMenuItem
                active={props.location.pathname === "/"}
                onClick={() => setToggleButton(!toggleButton)}
                >
                <StyledNavLink to="/"
                exact
                activeStyle={styles.active}
                >
                  <h3>
                  Students
                  </h3>
                </StyledNavLink>
              </NavMenuItem>
            <NavMenuItem
              name="My Profile"
              active={props.location.pathname === "/profile"}
              >
              <StyledNavLink to="/profile"
              exact
              activeStyle={styles.active}
              >
                <h3>
                My Profile
                </h3>
              </StyledNavLink>
            </NavMenuItem>
            <NavMenuItem
            // header as = "h3"
            name="Logout"
            onClick={() => handleLogout(props.history)} >
              <StyledNavLink
              exact
              activeStyle={styles.active}
              >
            <h3>
              Logout
            </h3>
              </StyledNavLink>
          </NavMenuItem>
        </NavRight>
      );
    } else {
      return (
        <NavRight>
            <NavMenuItem
              active={props.location.pathname === "/login"}>
                
                <StyledNavLink to="/login"
                exact
                activeStyle={styles.active}
                >
                  <h3>
                    Login
                  </h3>
                </StyledNavLink>
            </NavMenuItem>
            <NavMenuItem
              active={props.location.pathname === "/register"}>
                <StyledNavLink to="/register"
                exact
                activeStyle={styles.active}
                >
                  <h3>
                    Register
                  </h3>
              </StyledNavLink>
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
              style={{display: "inline", marginLeft: ".8rem", marginRight: ".8rem"}}
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
    color: '#8E2DE2',
    // borderBottom: ' #8E2DE2 3px solid',
    fontWeight: 'bold',
  }
}

const StyledDiv = styled.div`
  /* background-color: white; */
  /* background: #1C2225; */
  background: #191919;
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

const StyledNavLink = styled(NavLink)`
 text-decoration: none;
  color: #fff;
  font-size: 1.4em;
  transition: background 0.6s ease;


  h3{
  padding: .18em .2em;
  font-family: 'Nunito Sans', Arial, Helvetica, sans-serif; 
   
  &:hover {
    background-color:  #8E2DE2;
    /* border-bottom:  #8E2DE2 3px solid;  */
    color: white;
    border-radius: 3px;
    transition: background 0.6s ease;
  }
  }


`
const NavMenuItem = styled(Menu.Item)`
  padding: 15px;
  color: #ffffff;
  text-decoration: none;

`
export default withRouter(Navbar);
