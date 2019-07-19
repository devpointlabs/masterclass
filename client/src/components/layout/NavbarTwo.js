import React, { useState, } from "react";
import { AuthConsumer, } from "../../providers/AuthProvider";
import { Menu, Popup, Image, Container, Responsive, Header } from "semantic-ui-react";
import { NavLink, Link, withRouter, } from "react-router-dom";
import axios from 'axios'; 
import Search from './Search'; 
import styled from 'styled-components'; 

const NavbarTwo = (props) =>{
  const [toggleButton, setToggleButton] = useState(true);

  const rightNavItems= ({user, handleLogout}) =>{
    if(user){
      return(
        <NavRight>
        
              <>
              <Menu.Item
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
          >
            <h3>
              Logout
            </h3>

          </Menu.Item>

        </NavRight>
      );
    }
  }
  
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
              style={{display: "inline", float:"left", paddingTop: "18px",border:"solid 2px green"}}
            />
          </Link>
        
             <Search {...props} /> 
          </ContainerDiv>
          {rightNavItems(authProviderValueObject)}
        </StyledDiv>
      }
    </AuthConsumer >
  );
}

const styles = {
  active: {
    color: 'rgb(189, 122, 235)',
    fontWeight: 'bold',
  }
}

const ContainerDiv = styled.div`
  margin: auto;
    max-width: 1100px;
    overflow: auto;
    padding: 0 20px;
    font-size: 18px;
    float: left;
`


const StyledDiv = styled.div`
  /* background-color: white; */
  background: #333;
  color: #fff;
  overflow: auto;
  /* margin: 0; */
  /* padding: .6em 1em; */
`
const NavRight = styled.ul`
    list-style: none;
    float: right;
    margin-right: 8rem;
`

export default NavbarTwo